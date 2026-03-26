import React from 'react';
import { stylesKonto } from './styleskonto';

const Preferencje = () => {
  return (
    <div style={stylesKonto.sekcja}>
      <div style={stylesKonto.tytulSekcji}>Preferencje</div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
          <span>Otrzymuj powiadomienia email o nowych wydatkach</span>
        </label>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <input type="checkbox" style={{ width: '18px', height: '18px' }} />
          <span>Cotygodniowe podsumowanie wydatków</span>
        </label>
      </div>

      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
          <span>Tryb ciemny (zawsze włączony)</span>
        </label>
        <div style={stylesKonto.infoTekst}>Aplikacja działa w trybie ciemnym</div>
      </div>
    </div>
  );
};

export default Preferencje;