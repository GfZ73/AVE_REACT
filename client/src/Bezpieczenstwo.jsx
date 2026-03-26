import React from 'react';
import { stylesKonto } from './styleskonto';

const Bezpieczenstwo = ({ onLogout }) => {
  return (
    <div style={stylesKonto.sekcja}>
      <div style={stylesKonto.tytulSekcji}>Bezpieczeństwo</div>

      <div style={{ marginBottom: '15px' }}>
        <button
          style={{ ...stylesKonto.przycisk, backgroundColor: '#f39c12' }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#e67e22')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#f39c12')}
        >
          🔑 Zmień hasło
        </button>
      </div>

      <div style={stylesKonto.linia} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: '#999', fontSize: '14px' }}>Sesja</div>
          <div style={{ fontSize: '14px', marginTop: '5px' }}>
            Zalogowany od: {new Date().toLocaleTimeString('pl-PL')}
          </div>
        </div>
        <button
          style={stylesKonto.przyciskLogout}
          onClick={onLogout}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#c0392b')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#e74c3c')}
        >
          🚪 Wyloguj się
        </button>
      </div>
    </div>
  );
};

export default Bezpieczenstwo;