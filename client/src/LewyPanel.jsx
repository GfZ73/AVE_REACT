import React from 'react';
import styles from './styles';

const LewyPanel = ({
  zdjecie,
  handleZdjecieUpload,
  usunZdjecie,
  analizujZdjecieOCR,
  analizujZdjecieChatGPT,
  ladowanieAI,
  aktualnaOperacja,
  pokazWyniki,
  analiza,
  zatwierdzWynik,
  rozpocznijEdycjeParagonu,
  waluta
}) => {
 console.log('=== LEWY PANEL RENDER ===');
  console.log('ladowanieAI:', ladowanieAI);
  console.log('aktualnaOperacja:', aktualnaOperacja);
  console.log('pokazWyniki:', pokazWyniki);
  console.log('analiza:', analiza ? 'jest' : 'brak');

  
  const formatKwota = (kwota) => kwota.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ` ${waluta}`;

  return (
    <div style={styles.lewyPanel}>
      <input type="file" accept="image/*" onChange={handleZdjecieUpload} style={{ display: 'none' }} id="zdjecie-upload" />
      
      {!zdjecie ? (
        <label htmlFor="zdjecie-upload" style={styles.przyciskDodawaniaZdjecia}>
          <span style={styles.ikonaPlus}>+</span>
          <span style={styles.tekstPrzycisku}>Dodaj zdjęcie</span>
          <span style={styles.tekstPrzycisku}>(paragon, faktura)</span>
        </label>
      ) : (
        <>
          <div style={styles.podgladZdjecia}>
            <img src={zdjecie} alt="Podgląd" style={styles.zdjecie} />
            <button style={styles.przyciskUsunZdjecie} onClick={usunZdjecie}>×</button>
          </div>

          {/* DWA PRZYCISKI - OCR i ChatGPT */}
          {!ladowanieAI && !pokazWyniki && (
  <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
    <button 
      style={{
        ...styles.przyciskAnalizy, 
        backgroundColor: '#3498db',
      }}
      onClick={analizujZdjecieOCR}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
    >
      📷 Analizuj (OCR)
    </button>
    
    <button 
      style={{
        ...styles.przyciskAnalizy, 
        backgroundColor: '#10a37f',
      }}
      onClick={analizujZdjecieChatGPT}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#0d8b6f'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#10a37f'}
    >
      🤖 Analizuj (ChatGPT)
    </button>
  </div>
)}

{/* LOADER - widoczny gdy ladowanieAI jest true */}
{ladowanieAI && (
  <div style={styles.loader}>
    {aktualnaOperacja === 'ocr' ? (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <div style={styles.spinner}></div>
        <div>⏳ Analizowanie OCR... to może potrwać chwilę</div>
      </div>
    ) : aktualnaOperacja === 'chatgpt' ? (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <div style={styles.spinner}></div>
        <div>⏳ Analizowanie przez ChatGPT... to może potrwać chwilę</div>
      </div>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <div style={styles.spinner}></div>
        <div>⏳ Analizowanie... to może potrwać chwilę</div>
      </div>
    )}
  </div>
)}
          {pokazWyniki && analiza && (
            <div style={styles.wynikiAnalizy}>
              <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#27ae60' }}>✅ Znaleziono:</div>
              <div style={styles.wynikItem}><span>Sklep:</span><span>{analiza.sklep || 'Nieznany'}</span></div>
              <div style={styles.wynikItem}><span>Suma:</span><span>{formatKwota(analiza.suma || 0)}</span></div>
              <div style={styles.wynikItem}><span>Data:</span><span>{analiza.data || 'Nieznana'}</span></div>
              <div style={{ marginTop: '10px', fontWeight: 'bold' }}>Produkty:</div>
              {(analiza.produkty || []).slice(0, 3).map((p, i) => (
                <div key={i} style={styles.wynikItem}>
                  <span>{p.nazwa?.substring(0, 15)}...</span>
                  <span>{p.cena?.toFixed(2)} {waluta}</span>
                </div>
              ))}
              {(analiza.produkty || []).length > 3 && (
                <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  + {(analiza.produkty || []).length - 3} więcej
                </div>
              )}
              
              {/* NOWE PRZYCISKI - Edycja i Zatwierdź */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button 
                  style={{
                    ...styles.przyciskAnalizy,
                    backgroundColor: '#f39c12',
                    flex: 1,
                    marginBottom: 0
                  }}
                  onClick={rozpocznijEdycjeParagonu}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#e67e22'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#f39c12'}
                >
                  ✏️ Edytuj dane
                </button>
                
                <button 
                  style={{
                    ...styles.przyciskZatwierdz,
                    flex: 1,
                    marginTop: 0
                  }}
                  onClick={zatwierdzWynik}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#219a52'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
                >
                  ✅ Zatwierdź
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <div style={styles.informacjaZdjecie}>
        <strong style={{ color: '#fff', fontSize: '18px' }}>Dodaj zdjęcie paragonu</strong><br />
        Wybierz metodę analizy: OCR (szybka) lub ChatGPT (dokładniejsza)
      </div>
    </div>
  );
};

export default LewyPanel;