import pandas as pd

print("⏳ Sıkıştırılmış dev veri seti okunuyor (Arşivden çıkarmaya gerek yok)...")

# Open Beauty Facts verileri genelde Tab (\t) ile ayrılır.
target_columns = ['code', 'product_name', 'brands', 'ingredients_text']

try:
    # Pandas compression='gzip' sayesinde dosyayı doğrudan sıkıştırılmış haliyle okur
    df = pd.read_csv('data/en.openbeautyfacts.org.products.csv.gz', 
                     sep='\t', 
                     usecols=target_columns, 
                     compression='gzip', 
                     low_memory=False)
    
    print("⚡ Veriler hafızaya alındı, boş satırlar temizleniyor...")
    # Eksik verileri eliyoruz
    df = df.dropna(subset=['ingredients_text', 'product_name', 'brands'])
    
    # Sütun isimlerini bizim sisteme eşitliyoruz
    df.columns = ['Barcode', 'Name', 'Brand', 'Ingredients']
    
    # Yeni tertemiz ve hafif CSV'mizi kaydediyoruz
    df.to_csv('data/product_info.csv', index=False)
    print(f"✅ Başarılı Reis! {len(df)} adet global ürün 'data/product_info.csv' olarak hazırlandı.")

except Exception as e:
    print(f"🚨 Bir hata oluştu: {e}")
    print("İpucu: Eğer ayırma hatası verdiyse sep= engineering kısmında ',' yapıp tekrar deneyebiliriz.")