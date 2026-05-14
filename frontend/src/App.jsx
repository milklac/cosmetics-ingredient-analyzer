import React, { useState, useEffect } from 'react';

// ——— 🌍 6 DİL SÖZLÜĞÜ (Kategoriler ve Riskler Eklendi) ———
const translations = {
  tr: { 
    title: "Glow & Co.", btn: "✨ ANALİZ ET", report: "🧪 İÇERİK ANALİZİ", match: "🎯 Ürün Eşleşmesi", 
    skinTitle: "💧 CİLT UYUMU", skin: {oily: "🌿 Yağlı", dry: "💦 Kuru", combo: "⚖️ Karma", normal: "✨ Normal"}, 
    safetyTitle: "🛡️ GÜVENLİK", clean: "🌱 Temiz Formül", placeholder: "📝 İçindekiler (Ingredients) listesini buraya yapıştırın...",
    err: "🚨 Bağlantı Hatası! Sunucu açık mı?",
    cats: { Skincare: "Cilt Bakımı", Cleanser: "Temizleyici", Moisturizer: "Nemlendirici", Serum: "Serum", Sunscreen: "Güneş Kremi", Other: "Diğer" },
    risks: { Alcohol: "Alkol", Paraben: "Paraben", Sulfate: "Sülfat" }
  },
  en: { 
    title: "Glow & Co.", btn: "✨ ANALYZE", report: "🧪 INGREDIENT ANALYSIS", match: "🎯 Product Match", 
    skinTitle: "💧 SKIN COMPATIBILITY", skin: {oily: "🌿 Oily", dry: "💦 Dry", combo: "⚖️ Combo", normal: "✨ Normal"}, 
    safetyTitle: "🛡️ SAFETY", clean: "🌱 Clean Formula", placeholder: "📝 Paste ingredients list here...",
    err: "🚨 Connection Error! Is the server running?",
    cats: { Skincare: "Skincare", Cleanser: "Cleanser", Moisturizer: "Moisturizer", Serum: "Serum", Sunscreen: "Sunscreen", Other: "Other" },
    risks: { Alcohol: "Alcohol", Paraben: "Paraben", Sulfate: "Sulfate" }
  },
  fr: { 
    title: "Glow & Co.", btn: "✨ ANALYSER", report: "🧪 ANALYSE", match: "🎯 Correspondance", 
    skinTitle: "💧 COMPATIBILITÉ", skin: {oily: "🌿 Grasse", dry: "💦 Sèche", combo: "⚖️ Mixte", normal: "✨ Normale"}, 
    safetyTitle: "🛡️ SÉCURITÉ", clean: "🌱 Formule Propre", placeholder: "📝 Collez les ingrédients ici...",
    err: "🚨 Erreur de connexion!",
    cats: { Skincare: "Soin de la peau", Cleanser: "Nettoyant", Moisturizer: "Hydratant", Serum: "Sérum", Sunscreen: "Solaire", Other: "Autre" },
    risks: { Alcohol: "Alcool", Paraben: "Parabène", Sulfate: "Sulfate" }
  },
  es: { 
    title: "Glow & Co.", btn: "✨ ANALIZAR", report: "🧪 ANÁLISIS", match: "🎯 Coincidencia", 
    skinTitle: "💧 COMPATIBILIDAD", skin: {oily: "🌿 Grasa", dry: "💦 Seca", combo: "⚖️ Mixta", normal: "✨ Normal"}, 
    safetyTitle: "🛡️ SEGURIDAD", clean: "🌱 Fórmula Limpia", placeholder: "📝 Pegue los ingredientes aquí...",
    err: "🚨 ¡Error de conexión!",
    cats: { Skincare: "Cuidado de la piel", Cleanser: "Limpiador", Moisturizer: "Hidratante", Serum: "Suero", Sunscreen: "Protector Solar", Other: "Otro" },
    risks: { Alcohol: "Alcohol", Paraben: "Parabeno", Sulfate: "Sulfato" }
  },
  ru: { 
    title: "Glow & Co.", btn: "✨ АНАЛИЗ", report: "🧪 АНАЛИЗ", match: "🎯 Совпадение", 
    skinTitle: "💧 ТИП КОЖИ", skin: {oily: "🌿 Жирная", dry: "💦 Сухая", combo: "⚖️ Комби", normal: "✨ Норм"}, 
    safetyTitle: "🛡️ БЕЗОПАСНОСТЬ", clean: "🌱 Чистая формула", placeholder: "📝 Вставьте ингредиенты здесь...",
    err: "🚨 Ошибка подключения!",
    cats: { Skincare: "Уход за кожей", Cleanser: "Очищение", Moisturizer: "Увлажнение", Serum: "Сыворотка", Sunscreen: "Солнцезащита", Other: "Другое" },
    risks: { Alcohol: "Алкоголь", Paraben: "Парабены", Sulfate: "Сульфаты" }
  },
  ko: { 
    title: "Glow & Co.", btn: "✨ 분석하기", report: "🧪 성분 분석", match: "🎯 제품 일치율", 
    skinTitle: "💧 피부 적합성", skin: {oily: "🌿 지성", dry: "💦 건성", combo: "⚖️ 복합성", normal: "✨ 중성"}, 
    safetyTitle: "🛡️ 안전성", clean: "🌱 안전한 성분", placeholder: "📝 여기에 성분을 붙여넣으세요...",
    err: "🚨 연결 오류!",
    cats: { Skincare: "스킨케어", Cleanser: "클렌저", Moisturizer: "모이스처라이저", Serum: "세럼", Sunscreen: "자외선 차단제", Other: "기타" },
    risks: { Alcohol: "알코올", Paraben: "파라벤", Sulfate: "황산염" }
  }
};

export default function App() {
  const [lang, setLang] = useState('tr');
  const [ing, setIng] = useState('');
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    // 🛠️ Eksik Olan Animasyon Tanımı (Keyframes) Eklendi!
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInSmooth {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
      }
      html, body, #root {
        background-color: #F8F7F4 !important; 
        color: #2C2C2C !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        min-height: 100vh !important;
      }
      * { box-sizing: border-box; }
      textarea::placeholder { color: #A8A39E; }
    `;
    document.head.appendChild(style);

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const run = async () => {
    if (!ing.trim()) return;
    setLoading(true);
    try {
      const r = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ing })
      });
      setRes(await r.json());
    } catch { alert(t.err); }
    setLoading(false);
  };

  return (
    <div style={s.container}>
      <nav style={s.nav}>
        {['tr','en','fr','es','ru','ko'].map(l => (
          <span key={l} onClick={() => setLang(l)} style={lang === l ? s.langA : s.langP}>{l.toUpperCase()}</span>
        ))}
      </nav>

      <header style={s.header}>
        <h1 style={s.h1}>{t.title}</h1>
      </header>

      <main style={s.main}>
        <div style={s.inputWrapper}>
          <textarea 
            style={s.txt} 
            placeholder={t.placeholder}
            value={ing} 
            onChange={e => setIng(e.target.value)} 
          />
          <button style={s.btn} onClick={run} disabled={loading}>
            {loading ? "⏳..." : t.btn}
          </button>
        </div>

        {res && (
          <div style={s.reportArea}>
            <div style={s.meta}>{t.report}</div>
            
            <div style={s.productBox}>
              <div style={s.brand}>🧴 {res.product.brand}</div>
              <div style={s.name}>{res.product.name}</div>
              <div style={s.matchBadge}>
                {t.match}: <strong style={{color: '#8FA882'}}>%{res.product.score}</strong>
              </div>
            </div>

            <div style={s.grid}>
              {/* Cilt Tipi */}
              <div style={s.card}>
                <div style={s.cardTitle}>{t.skinTitle}</div>
                {Object.entries(res.skin_scores).map(([k, v]) => (
                  <div key={k} style={s.barRow}>
                    <div style={s.barInfo}><span>{t.skin[k]}</span><span>%{v}</span></div>
                    <div style={s.barBase}>
                      <div style={{
                        ...s.barFill, 
                        width: `${v}%`, 
                        background: v >= 60 ? '#8FA882' : '#D4CDC7' 
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Güvenlik & Kategori (Geri Döndü!) */}
              <div style={s.card}>
                <div style={s.cardTitle}>{t.safetyTitle}</div>
                
                {/* 🛠️ Kategori Rozeti Geri Eklendi */}
                <div style={s.catBadge}>
                  {t.cats[res.category] || res.category}
                </div>

                {/* 🛠️ Güvenlik Kelimeleri Çevrildi */}
                <div style={{
                  ...s.safetyText, 
                  color: res.safety.length > 0 ? '#C59A84' : '#8FA882'
                }}>
                  {res.safety.length > 0 
                    ? `⚠️ ${res.safety.map(r => t.risks[r] || r).join(' • ')}` 
                    : t.clean}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ——— 🌿 KUSURSUZ ONSKIN CSS ———
const s = {
  container: { background: '#F8F7F4', minHeight: '100vh', paddingBottom: '100px', fontFamily: '"Plus Jakarta Sans", sans-serif' },
  nav: { textAlign: 'center', padding: '30px 0', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' },
  langA: { fontSize: '0.8rem', fontWeight: 700, color: '#2C2C2C', borderBottom: '2px solid #8FA882', paddingBottom: '2px', cursor: 'pointer', letterSpacing: '1px' },
  langP: { fontSize: '0.8rem', fontWeight: 500, color: '#A8A39E', cursor: 'pointer', letterSpacing: '1px' },
  
  header: { textAlign: 'center', marginBottom: '50px' },
  h1: { fontFamily: '"Playfair Display", serif', fontSize: '4.5rem', color: '#8FA882', margin: 0, fontWeight: 500, letterSpacing: '-1px' },
  
  main: { maxWidth: '850px', margin: '0 auto', padding: '0 20px' },
  inputWrapper: { background: '#FFFFFF', padding: '30px', borderRadius: '24px', border: '1px solid #EBE7E1', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' },
  
  txt: { 
    width: '100%', minHeight: '120px', padding: '15px', 
    border: 'none', borderBottom: '1px solid #F0ECE7', 
    outline: 'none', fontSize: '1.1rem', color: '#2C2C2C', 
    background: 'transparent', fontFamily: 'inherit', resize: 'vertical', lineHeight: '1.6'
  },
  btn: { width: '100%', marginTop: '20px', padding: '18px', background: '#2C2C2C', color: '#FFFFFF', border: 'none', borderRadius: '50px', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '2px', cursor: 'pointer', transition: '0.3s' },

  // 🛠️ Animasyon Düzeltildi
  reportArea: { marginTop: '60px', animation: 'fadeInSmooth 0.8s ease-out' },
  meta: { textAlign: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#A8A39E', letterSpacing: '3px', marginBottom: '40px' },
  
  productBox: { textAlign: 'center', marginBottom: '60px' },
  brand: { fontSize: '1rem', fontWeight: 700, color: '#A8A39E', letterSpacing: '2px', textTransform: 'uppercase' },
  name: { fontFamily: '"Playfair Display", serif', fontSize: '3.2rem', color: '#2C2C2C', margin: '10px 0', lineHeight: 1.1 },
  matchBadge: { display: 'inline-block', background: '#F2F5F0', color: '#6A7D5E', padding: '8px 20px', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600, marginTop: '10px' },

  grid: { display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '30px' },
  card: { background: '#FFFFFF', padding: '35px', borderRadius: '24px', border: '1px solid #EBE7E1' },
  cardTitle: { fontSize: '0.75rem', fontWeight: 700, color: '#A8A39E', letterSpacing: '1.5px', marginBottom: '25px', textTransform: 'uppercase' },
  
  // 🛠️ Geri Dönen Kategori Rozeti Stili
  catBadge: { display: 'inline-block', padding: '6px 14px', background: '#F8F7F4', border: '1px solid #EBE7E1', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700, color: '#8FA882', marginBottom: '20px' },
  
  safetyText: { fontSize: '1.1rem', fontWeight: 600 },

  barRow: { marginBottom: '20px' },
  barInfo: { display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 600, color: '#4A4643', marginBottom: '8px' },
  barBase: { height: '6px', background: '#F4F2EF', borderRadius: '10px', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: '10px', transition: 'width 1s ease-out' }
};