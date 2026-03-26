import React from 'react';
import styles from './styles';

const PrawyPanel = ({
  kategorie,
  aktywnaKategoria,
  setAktywnaKategoria,
  przefiltrowaneWydatki,
  sumaWydatkow,
  formatKwota,
  dodajRęcznie,
  usunWydatek,
  edytujWydatek  // ← NOWY PROP
}) => {
  console.log('edycjaWydatek w PrawyPanel:', edytujWydatek); // <-- Dodany log
  return (
    <div style={styles.prawyPanel}>
      <div style={styles.kategorieBar}>
        {kategorie.map(k => (
          <button
            key={k}
            style={{ ...styles.kategorieButton, ...(aktywnaKategoria === k ? styles.aktywnaKategoria : {}) }}
            onClick={() => setAktywnaKategoria(k)}
          >
            {k}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'right', marginBottom: '30px' }}>
        <button 
          style={styles.dodajWydatekButton}
          onClick={dodajRęcznie}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#219a52'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
        >
          + Dodaj ręcznie
        </button>
      </div>

      <div style={styles.srodkowyContainer}>
        <div style={styles.sumaWydatkow}>
          <div style={styles.sumaTytul}>Suma wydatków</div>
          <div style={styles.sumaKwota}>{formatKwota(sumaWydatkow)}</div>
        </div>

        <div style={styles.listaWydatkow}>
          <h2 style={styles.listaTytul}>Wydatki w kategorii: {aktywnaKategoria}</h2>
          {przefiltrowaneWydatki.length === 0 ? (
            <p style={styles.brakWydatkow}>Brak wydatków w tej kategorii</p>
          ) : (
            <table style={styles.tabela}>
              <thead>
                <tr>
                  <th style={{ ...styles.naglowekTabeli, ...styles.kolumnaKategoria }}>Kategoria</th>
                  <th style={{ ...styles.naglowekTabeli, ...styles.kolumnaNazwa }}>Nazwa</th>
                  <th style={{ ...styles.naglowekTabeli, ...styles.kolumnaKwota }}>Kwota</th>
                  <th style={{ ...styles.naglowekTabeli, ...styles.kolumnaData }}>Data</th>
                  <th style={{ ...styles.naglowekTabeli, ...styles.kolumnaAkcje }}>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {przefiltrowaneWydatki.map(w => (
                  <tr key={w._id || w.id} style={styles.wierszTabeli}>
                    <td style={styles.komorkaTabeli}>
                      {w.kategoria}
                      {w.paragonDane && <span style={{ marginLeft: '5px', color: '#3498db' }} title="Z paragonu">📸</span>}
                    </td>
                    <td style={styles.komorkaTabeli}>{w.nazwa}</td>
                    <td style={styles.komorkaKwota}>{formatKwota(w.kwota)}</td>
                    <td style={styles.komorkaData}>{w.data}</td>
                    <td style={styles.komorkaAkcje}>
                      <div style={styles.akcjeContainer}>
                        <button 
                          style={styles.przyciskEdycji}
                          onClick={() => edytujWydatek(w)}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#e67e22'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#f39c12'}
                          title="Edytuj wydatek"
                        >
                          ✏️
                        </button>
                        <button 
                          style={styles.przyciskUsun}
                          onClick={() => usunWydatek(w._id || w.id)}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
                          title="Usuń wydatek"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrawyPanel;