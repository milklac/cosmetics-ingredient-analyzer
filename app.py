import React, { useState, useEffect } from 'react';

const translations = {
  tr: { title: "Glow & Co.", sub: "DİJİTAL ATÖLYE", btn: "ANALİZ ET", placeholder: "İçerikleri yapıştırın...", report: "Laboratuvar Raporu", match: "Eşleşme", safety: "Güvenlik", skin: {combo: "Karma", normal: "Normal", oily: "Yağlı", dry: "Kuru"}},
  en: { title: "Glow & Co.", sub: "DIGITAL ATELIER", btn: "ANALYZE", placeholder: "Paste ingredients...", report: "Lab Report", match: "Match", safety: "Safety", skin: {combo: "Combo", normal: "Normal", oily: "Oily", dry: "Dry"}},
  es: { title: "Glow & Co.", sub: "TALLER DIGITAL", btn: "ANALIZAR", placeholder: "Pegar ingredientes...", report: "Informe Lab", match: "Coincidencia", safety: "Seguridad", skin: {combo: "Mixta", normal: "Normal", oily: "Grasa", dry: "Seca"}},
  ru: { title: "Glow & Co.", sub: "ЦИФРОВАЯ МАСТЕРСКАЯ", btn: "АНАЛИЗ", placeholder: "Вставьте ингредиенты...", report: "Отчет Лаборатории", match: "Совпадение", safety: "Безопасность", skin: {combo: "Комби", normal: "Норм", oily: "Жирная", dry: "Сухая"}}
};

export default function App() {
  const [lang, setLang] = useState('tr');
  const [ing, setIng] = useState('');
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const t = translations[lang];

  const run = async () => {
    setLoading(true);
    try {
      const r = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ ingredients: ing })
      });
      setRes(await r.json());
    } catch { alert("Error!"); }
    setLoading(false);
  };

  return (
    <div style={s.container}>
      {/* 🌍 Dil Seçici */}
      <div style={s.langBar}>
        {['tr','en','es','ru'].map(l => (
          <span key={l} onClick={() => setLang(l)} style={lang === l ? s.langA : s.langP}>{l.toUpperCase()}</span>
        ))}
      </div>

      <header style={s.header}>
        <h1 style={s.h1}>{t.title}</h1>
        <div style={s.sub}>{t.sub}</div>
      </header>

      <div style={s.main}>
        <textarea style={s.txt} placeholder={t.placeholder} value={ing} onChange={e => setIng(e.target.value)} rows={6} />
        <button style={s.btn} onClick={run} disabled={loading}>{loading ? "..." : t.btn}</button>

        {res && (
          <div style={s.sheet}>
            <h2 style={s.shH2}>{t.report}</h2>
            <div style={s.det}>
              <div style={s.detL}>{res.product.score > 70 ? "✔" : "!"} {t.match}</div>
              <div style={s.prod}>{res.product.brand} - {res.product.name}</div>
              <div style={s.score}>%{res.product.score}</div>
            </div>

            <div style={s.grid}>
              <div style={s.panel}>
                <div style={s.ph}>{t.safety}</div>
                <div style={res.safety.length ? s.risk : s.safe}>{res.safety.length ? res.safety.join(', ') : "Clean"}</div>
              </div>
              <div style={s.panel}>
                <div style={s.ph}>{t.skin.combo} & {t.skin.oily}</div>
                <div style={s.gGrid}>
                  {Object.entries(res.skin_scores).map(([k, v]) => (
                    <div key={k} style={s.gBox}>
                      <div style={{...s.gO, background: `conic-gradient(#D4AF37 0% ${v}%, #EFE2D8 ${v}% 100%)`}}>
                        <div style={s.gI}>%{v}</div>
                      </div>
                      <div style={s.gL}>{t.skin[k]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  container: { background: '#FFFDFB', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Playfair Display, serif' },
  langBar: { textAlign: 'right', marginBottom: '20px' },
  langA: { color: '#4A2E2B', fontWeight: 700, margin: '0 5px', borderBottom: '2px solid #D4AF37', cursor: 'pointer' },
  langP: { color: '#AAA', margin: '0 5px', cursor: 'pointer' },
  header: { textAlign: 'center', marginBottom: '40px' },
  h1: { fontSize: '3.5rem', margin: 0, color: '#4A2E2B' },
  sub: { letterSpacing: '5px', fontSize: '0.8rem', color: '#8E7E73' },
  main: { maxWidth: '700px', margin: '0 auto' },
  txt: { width: '100%', padding: '20px', borderRadius: '15px', border: '1px solid #EADACF', outline: 'none', fontFamily: 'Inter, sans-serif' },
  btn: { width: '100%', marginTop: '15px', padding: '15px', borderRadius: '15px', border: 'none', background: '#4A2E2B', color: '#FFF', cursor: 'pointer', fontWeight: 600, letterSpacing: '2px' },
  sheet: { marginTop: '40px', background: '#FFF', padding: '30px', borderRadius: '25px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #EADACF' },
  shH2: { textAlign: 'center', borderBottom: '1px solid #EEE', paddingBottom: '15px' },
  det: { textAlign: 'center', margin: '20px 0', padding: '20px', background: '#FDFBF8', borderRadius: '20px', border: '1px solid #D4AF37' },
  detL: { fontSize: '0.7rem', color: '#8E7E73', fontWeight: 600 },
  prod: { fontSize: '1.8rem', margin: '10px 0' },
  score: { color: '#D4AF37', fontWeight: 700 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' },
  panel: { padding: '20px', border: '1px solid #EFE2D8', borderRadius: '20px' },
  ph: { fontWeight: 600, marginBottom: '10px', fontSize: '0.9rem' },
  safe: { color: '#8FA882' }, risk: { color: '#C59A84' },
  gGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  gBox: { textAlign: 'center' },
  gO: { width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' },
  gI: { width: '48px', height: '48px', background: '#FFF', borderRadius: '50%', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 },
  gL: { fontSize: '0.6rem', marginTop: '5px', textTransform: 'uppercase', color: '#8E7E73' }
};