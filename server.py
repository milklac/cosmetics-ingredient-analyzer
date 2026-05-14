from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import re
import os

# Mevcut dosyanın bulunduğu tam yolu al (Render için daha güvenli)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, 'data', 'product_info.zip')

# Kontrol için log bas (Render Dashboard'da görebilirsin)
if os.path.exists(CSV_PATH):
    print(f"✅ Veri seti bulundu: {CSV_PATH}")
else:
    print(f"❌ Veri seti bulunamadı: {CSV_PATH}")

# --- 🧪 MOLEKÜLER TEMİZLİK ---
def clean_ing(text):
    if not text: return set()
    # Küçük harfe çevir, parantez içlerini sil, sadece harfleri tut
    text = re.sub(r'\(.*?\)', '', str(text).lower())
    # Virgül, taksim veya noktalı virgülle ayrılan her şeyi kelime kelime al
    items = re.split(r'[,;/]', text)
    # Kelimelerin içindeki gereksiz boşluk ve karakterleri temizle
    refined = {re.sub(r'[^a-z0-9]', '', i).strip() for i in items if len(i.strip()) > 2}
    return refined

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    raw_ing = data.get('ingredients', '').strip()
    if not raw_ing or df is None: return jsonify({'error': 'Hata'}), 400

    # 🕵️‍♂️ ÜRÜN BULUCU (Yeni Nesil Set-Match)
    user_set = clean_ing(raw_ing)
    best_idx = -1
    max_score = 0.0

    # Veri setindeki her ürünü süzgeçten geçir
    for idx, row in df.iterrows():
        db_set = clean_ing(row['Ingredients'])
        if not db_set: continue
        
        # Ortak maddeleri bul
        common = user_set.intersection(db_set)
        
        # Jaccard Score: (Ortak / Toplam)
        score = len(common) / len(user_set.union(db_set))
        
        # KRİTİK DÜZELTME: Eğer ürün adı veya marka metinde geçiyorsa puanı uçur
        brand_low = str(row['Brand']).lower()
        if brand_low in raw_ing.lower(): score += 0.2
        
        if score > max_score:
            max_score = score
            best_idx = idx

    # 🧪 CİLT TİPİ (Hard-Coded / Kesin Bilgi)
    scores = {'oily': 20, 'dry': 20, 'combo': 20, 'normal': 20}
    rules = {
        'oily': ['salicylic', 'zinc', 'niacinamide', 'clay', 'bha', 'sebium'],
        'dry': ['ceramide', 'shea', 'hyaluronic', 'glycerin', 'urea', 'oil', 'panthenol'],
        'combo': ['niacinamide', 'centella', 'green tea'],
        'normal': ['vitamin e', 'aloe']
    }
    
    text_low = raw_ing.lower()
    for s_type, keys in rules.items():
        for k in keys:
            if k in text_low: scores[s_type] += 25

    # Skorları belirginleştir (Normalize)
    top_s = max(scores.values())
    final_skin = {k: min(round((v / top_s) * 98), 100) for k, v in scores.items()}

    # 📋 SONUÇLARI PAKETLE
    res_product = {
        'brand': str(df.iloc[best_idx]['Brand']) if max_score > 0.05 else "New Brand",
        'name': str(df.iloc[best_idx]['Name']) if max_score > 0.05 else "Unique Formula",
        'score': round(min(max_score * 120, 100), 1) # Skoru biraz daha cömert göster
    }

    return jsonify({
        'category': "Skincare",
        'product': res_product,
        'safety': ['Alcohol'] if 'alcohol denat' in text_low else [],
        'skin_scores': final_skin
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)