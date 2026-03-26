import React from 'react';
import { stylesKonto } from './styleskonto';

const DaneOsobowe = ({
  daneUzytkownika,
  formData,
  setFormData,
  edycja,
  setEdycja,
  handleInputChange,
  handleZapisz,
}) => {
  return (
    <div style={stylesKonto.sekcja}>
      <div style={stylesKonto.tytulSekcji}>Dane osobowe</div>

      {!edycja ? (
        <>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ color: '#999', fontSize: '14px' }}>Login</div>
            <div style={{ fontSize: '16px', marginTop: '5px' }}>{daneUzytkownika.login}</div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ color: '#999', fontSize: '14px' }}>Email</div>
            <div style={{ fontSize: '16px', marginTop: '5px' }}>
              {daneUzytkownika.email || 'Nie podano'}
            </div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ color: '#999', fontSize: '14px' }}>Imię i nazwisko</div>
            <div style={{ fontSize: '16px', marginTop: '5px' }}>
              {daneUzytkownika.imie || 'Nie podano'} {daneUzytkownika.nazwisko || ''}
            </div>
          </div>

          <div style={stylesKonto.akcje}>
            <button
              style={stylesKonto.przycisk}
              onClick={() => setEdycja(true)}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#2980b9')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#3498db')}
            >
              ✏️ Edytuj dane
            </button>
          </div>
        </>
      ) : (
        <div style={stylesKonto.formularz}>
          <div style={stylesKonto.poleFormularza}>
            <label style={stylesKonto.label}>Login</label>
            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={handleInputChange}
              style={{ ...stylesKonto.input, ...stylesKonto.inputDisabled }}
              disabled
            />
            <div style={stylesKonto.infoTekst}>Loginu nie można zmienić</div>
          </div>

          <div style={stylesKonto.poleFormularza}>
            <label style={stylesKonto.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={stylesKonto.input}
              placeholder="Twój email"
            />
          </div>

          <div style={stylesKonto.poleFormularza}>
            <label style={stylesKonto.label}>Imię</label>
            <input
              type="text"
              name="imie"
              value={formData.imie}
              onChange={handleInputChange}
              style={stylesKonto.input}
              placeholder="Twoje imię"
            />
          </div>

          <div style={stylesKonto.poleFormularza}>
            <label style={stylesKonto.label}>Nazwisko</label>
            <input
              type="text"
              name="nazwisko"
              value={formData.nazwisko}
              onChange={handleInputChange}
              style={stylesKonto.input}
              placeholder="Twoje nazwisko"
            />
          </div>

          <div style={stylesKonto.akcje}>
            <button
              style={stylesKonto.przycisk}
              onClick={handleZapisz}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#2980b9')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#3498db')}
            >
              💾 Zapisz zmiany
            </button>
            <button
              style={stylesKonto.przyciskAnuluj}
              onClick={() => {
                setFormData(daneUzytkownika);
                setEdycja(false);
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#95a5a6')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#7f8c8d')}
            >
              ✖ Anuluj
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaneOsobowe;