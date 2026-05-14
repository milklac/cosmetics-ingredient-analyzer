from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app) # Vercel'den gelen isteklere izin ver

# --- 📁 VERİ YOLU (RENDER İÇİN GARANTİ) ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Zip veya CSV hangisini kullanıyorsan adını burada kontrol et!
CSV_PATH = os.path.join(BASE_DIR, 'data', 'product_info.zip') 

df = None
try:
    if os.path.exists(CSV_PATH):
        df = pd.read_csv(CSV_PATH).dropna(subset=['Ingredients'])
        print(f"✅ VERİ SETİ YÜKLENDİ: {len(df)} ÜRÜN")
    else:
        print(f"❌ KRİTİK HATA: {CSV_PATH} BULUNAMADI!")
except Exception as e:
    print(f"❌ OKUMA HATASI: {str(e)}")

@app.route('/api/analyze', methods=['POST'])
def analyze():
    # 🕵️‍♂️ Veriyi kontrol et
    data = request.get_json(silent=True)
    if not data or 'ingredients' not in data:
        return jsonify({'error': 'İçerik listesi boş gönderildi'}), 400
    
    raw_ing = data.get('ingredients', '').strip().lower()
    if not raw_ing:
        return jsonify({'error': 'Metin kutusu boş!'}), 400

    if df is None:
        return jsonify({'error': 'Veri tabanı sunucuda yüklü değil!'}), 500

    # Basit eşleşme mantığı (Test için en hızlısı)
    best_match = None
    max_score = 0
    
    # Çok hızlı bir kelime taraması yapalım
    user_words = set(raw_ing.replace(',', ' ').split())
    
    for idx, row in df.head(1000).iterrows(): # Hız için ilk 1000 ürüne bak
        db_words = set(str(row['Ingredients']).lower().replace(',', ' ').split())
        common = user_words.intersection(db_words)
        score = len(common)
        
        if score > max_score:
            max_score = score
            best_match = row

    # Sonuç hazırla
    return jsonify({
        'product': {
            'brand': str(best_match['Brand']) if best_match is not None else "Bilinmiyor",
            'name': str(best_match['Name']) if best_match is not None else "Yeni Formül",
            'score': min(max_score * 10, 98) if max_score > 0 else 0
        },
        'skin_scores': {'oily': 60, 'dry': 40, 'combo': 70, 'normal': 80}, # Örnek skorlar
        'safety': [],
        'category': 'Skincare'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)