import React from 'react';
import styles from './styles';

const EdycjaParagonu = ({
  pokazEdycjeParagonu,
  edycjaParagonu,
  handleEdycjaParagonuChange,
  handleProduktChange,
  dodajProdukt,
  usunProdukt,
  zapiszEdycjeParagonu,
  anulujEdycjeParagonu,
  kategorieLista,
  formatKwota
}) => {
  if (!pokazEdycjeParagonu || !edycjaParagonu) return null;

  return (
<div style={{
  ...styles.formularzOverlay,
  overflowY: 'auto',  
  padding: '20px 0'   
}} onClick={anulujEdycjeParagonu}>      <div style={{...styles.formularz, maxWidth: '800px'}} onClick={e => e.stopPropagation()}>
        <h2 style={styles.formularzTytul}>Edytuj dane z paragonu</h2>

        <form onSubmit={(e) => { e.preventDefault(); zapiszEdycjeParagonu(); }}>
          {/* Podstawowe dane paragonu */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Nazwa sklepu</label>
            <input
              type="text"
              value={edycjaParagonu.sklep}
              onChange={(e) => handleEdycjaParagonuChange('sklep', e.target.value)}
              style={styles.input}
              placeholder="Nazwa sklepu"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Data</label>
            <input
              type="date"
              value={edycjaParagonu.data}
              onChange={(e) => handleEdycjaParagonuChange('data', e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Lista produktów */}
          <div style={styles.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <label style={styles.label}>Produkty</label>
              <button 
                type="button"
                onClick={dodajProdukt}
                style={{
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '8px 15px',
                  cursor: 'pointer'
                }}
              >
                + Dodaj produkt
              </button>
            </div>

            {edycjaParagonu.produkty.map((produkt, index) => (
              <div key={index} style={{
                backgroundColor: '#2a2a3a',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '10px',
                border: '1px solid #444'
              }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={produkt.nazwa}
                    onChange={(e) => handleProduktChange(index, 'nazwa', e.target.value)}
                    style={{...styles.input, flex: 2}}
                    placeholder="Nazwa produktu"
                  />
                  <input
                    type="number"
                    value={produkt.cena}
                    onChange={(e) => handleProduktChange(index, 'cena', parseFloat(e.target.value) || 0)}
                    style={{...styles.input, flex: 1}}
                    placeholder="Cena"
                    step="0.01"
                    min="0"
                  />
                  <select
                    value={produkt.kategoria || 'Inne'}
                    onChange={(e) => handleProduktChange(index, 'kategoria', e.target.value)}
                    style={{...styles.select, flex: 1}}
                  >
                    {kategorieLista.map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => usunProdukt(index)}
                    style={{
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '10px 15px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Podsumowanie */}
          <div style={{
            backgroundColor: '#1a1a2e',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '2px solid #27ae60'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>SUMA:</span>
              <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#27ae60' }}>
                {formatKwota(edycjaParagonu.suma)}
              </span>
            </div>
          </div>

          {/* Przyciski */}
          <div style={styles.formularzPrzyciski}>
            <button 
              type="submit" 
              style={styles.przyciskZapisz}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#219a52'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
            >
              💾 Zatwierdź zmiany
            </button>
            <button 
              type="button" 
              style={styles.przyciskAnuluj}
              onClick={anulujEdycjeParagonu}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
            >
              ✖ Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EdycjaParagonu;