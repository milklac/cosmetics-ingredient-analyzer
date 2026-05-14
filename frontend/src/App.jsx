import React, { useState, useEffect } from 'react';

const translations = {
  tr: { 
    title: "Glow & Co.", btn: "✨ ANALİZ ET", report: "🧪 İÇERİK ANALİZİ", match: "🎯 Ürün Eşleşmesi", 
    skinTitle: "💧 CİLT UYUMU", skin: {oily: "🌿 Yağlı", dry: "💦 Kuru", combo: "⚖️ Karma", normal: "✨ Normal"}, 
    safetyTitle: "🛡️ GÜVENLİK", clean: "🌱 Temiz Formül", placeholder: "📝 İçindekiler (Ingredients) listesini buraya yapıştırın...",
    err: "🚨 Sunucu uykuda olabilir, 10 saniye bekleyip tekrar bas!",
    cats: { Skincare: "Cilt Bakımı", Cleanser: "Temizleyici", Moisturizer: "Nemlendirici", Serum: "Serum", Sunscreen: "Güneş Kremi", Other: "Diğer" },
    risks: { Alcohol: "Alkol", Paraben: "Paraben", Sulfate: "Sülfat" }
  },
  en: { 
    title: "Glow & Co.", btn: "✨ ANALYZE", report: "🧪 INGREDIENT ANALYSIS", match: "🎯 Product Match", 
    skinTitle: "💧 SKIN COMPATIBILITY", skin: {oily: "🌿 Oily", dry: "💦 Dry", combo: "⚖️ Combo", normal: "✨ Normal"}, 
    safetyTitle: "🛡️ SAFETY", clean: "🌱 Clean Formula", placeholder: "📝 Paste ingredients list here...",
    err: "🚨 Server might be asleep, wait 10s and try again!",
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
    cats: { Skincare: "스킨케어", Cleanser: "클렌저", 모이스처라이저: "모이스처라이저", Serum: "세럼", Sunscreen: "자외선 차단제", Other: "기타" },
    risks: { Alcohol: "알코올", Paraben: "파라벤", Sulfate: "황산염" }
  }
};

export default function App() {
  const [lang, setLang] = useState('tr');
  const [ing, setIng] = useState('');
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const t = translations[lang];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

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
        overflow-x: hidden !important;
      }
      * { box-sizing: border-box; }
      textarea::placeholder { color: #A8A39E; }
    `;
    document.head.appendChild(style);

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  cconst run = async () => {
    if (!ing.trim()) return;
    setLoading(true);
    setRes(null);
    
    try {
      const response = await fetch('https://cosmetics-ingredient-analyzer.onrender.com/api/analyze', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ ingredients: ing }) // "ingredients" anahtarı burada çok önemli
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Sunucu hatası!");
      }

      if (data.product) {
        setRes(data);
      }
    } catch (err) {
      alert("Hata: " + err.message);
    } finally {
      setLoading(false);
    }
};

      // Backend bilerek hata fırlattıysa (Örn: df = None ise)
      if (data.error) {
        alert("🚨 PYTHON SUNUCU HATASI: " + data.error + "\n(Büyük ihtimalle product_info.zip dosyası Render'da eksik veya okunmuyor!)");
      } 
      // Her şey tamamsa ve ürün objesi varsa
      else if (data.product) {
        setRes(data);
      } else {
        alert("❓ Beklenmeyen formatta veri geldi.");
      }

    } catch (err) { 
      alert(t.err + "\nDetay: " + err.message); 
    }
    
    setLoading(false);
  };

  return (
    <div style={{ background: '#F8F7F4', minHeight: '100vh', paddingBottom: '80px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      
      <nav style={{ textAlign: 'center', padding: isMobile ? '20px 10px' : '30px 0', display: 'flex', justifyContent: 'center', gap: isMobile ? '12px' : '20px', flexWrap: 'wrap' }}>
        {['tr','en','fr','es','ru','ko'].map(l => (
          <span key={l} onClick={() => setLang(l)} style={{ fontSize: '0.8rem', fontWeight: lang === l ? 700 : 500, color: lang === l ? '#2C2C2C' : '#A8A39E', borderBottom: lang === l ? '2px solid #8FA882' : 'none', paddingBottom: '2px', cursor: 'pointer', letterSpacing: '1px' }}>
            {l.toUpperCase()}
          </span>
        ))}
      </nav>

      <header style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '50px' }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: isMobile ? '2.8rem' : '4.5rem', color: '#8FA882', margin: 0, fontWeight: 500, letterSpacing: '-1px' }}>
          {t.title}
        </h1>
      </header>

      <main style={{ maxWidth: '850px', margin: '0 auto', padding: '0 15px' }}>
        <div style={{ background: '#FFFFFF', padding: isMobile ? '20px' : '30px', borderRadius: '24px', border: '1px solid #EBE7E1', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
          <textarea 
            style={{ width: '100%', minHeight: '120px', padding: '10px', border: 'none', borderBottom: '1px solid #F0ECE7', outline: 'none', fontSize: isMobile ? '1rem' : '1.1rem', color: '#2C2C2C', background: 'transparent', fontFamily: 'inherit', resize: 'vertical', lineHeight: '1.6' }} 
            placeholder={t.placeholder}
            value={ing} 
            onChange={e => setIng(e.target.value)} 
          />
          <button style={{ width: '100%', marginTop: '20px', padding: '16px', background: '#2C2C2C', color: '#FFFFFF', border: 'none', borderRadius: '50px', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '2px', cursor: 'pointer', transition: '0.3s' }} onClick={run} disabled={loading}>
            {loading ? "⏳..." : t.btn}
          </button>
        </div>

        {/* 🛡️ Soru İşaretli Güvenlik Kalkanları (Optional Chaining) */}
        {res && res.product && (
          <div style={{ marginTop: '50px', animation: 'fadeInSmooth 0.8s ease-out' }}>
            <div style={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#A8A39E', letterSpacing: '3px', marginBottom: '30px' }}>{t.report}</div>
            
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#A8A39E', letterSpacing: '2px', textTransform: 'uppercase' }}>🧴 {res?.product?.brand}</div>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: isMobile ? '2.2rem' : '3.2rem', color: '#2C2C2C', margin: '10px 0', lineHeight: 1.1 }}>{res?.product?.name}</div>
              <div style={{ display: 'inline-block', background: '#F2F5F0', color: '#6A7D5E', padding: '8px 20px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, marginTop: '10px' }}>
                {t.match}: <strong style={{color: '#8FA882'}}>%{res?.product?.score}</strong>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: '20px' }}>
              
              <div style={{ background: '#FFFFFF', padding: isMobile ? '25px' : '35px', borderRadius: '24px', border: '1px solid #EBE7E1' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A8A39E', letterSpacing: '1.5px', marginBottom: '20px', textTransform: 'uppercase' }}>{t.skinTitle}</div>
                {Object.entries(res?.skin_scores || {}).map(([k, v]) => (
                  <div key={k} style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600, color: '#4A4643', marginBottom: '6px' }}><span>{t.skin[k]}</span><span>%{v}</span></div>
                    <div style={{ height: '6px', background: '#F4F2EF', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: '10px', transition: 'width 1s ease-out', width: `${v}%`, background: v >= 60 ? '#8FA882' : '#D4CDC7' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#FFFFFF', padding: isMobile ? '25px' : '35px', borderRadius: '24px', border: '1px solid #EBE7E1' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A8A39E', letterSpacing: '1.5px', marginBottom: '20px', textTransform: 'uppercase' }}>{t.safetyTitle}</div>
                <div style={{ display: 'inline-block', padding: '6px 14px', background: '#F8F7F4', border: '1px solid #EBE7E1', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, color: '#8FA882', marginBottom: '15px' }}>
                  {t.cats[res?.category] || res?.category || "Skincare"}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: (res?.safety?.length > 0) ? '#C59A84' : '#8FA882' }}>
                  {(res?.safety?.length > 0) ? `⚠️ ${res.safety.map(r => t.risks[r] || r).join(' • ')}` : t.clean}
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}