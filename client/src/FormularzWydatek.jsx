import React from 'react';
import styles from './styles';

const FormularzWydatek = ({ pokazFormularz, setPokazFormularz, nowyWydatek, handleInputChange, dodajWydatek, kategorieLista }) => {
  if (!pokazFormularz) return null;

  return (
    <div style={styles.formularzOverlay} onClick={() => setPokazFormularz(false)}>
      <div style={styles.formularz} onClick={e => e.stopPropagation()}>
        <h2 style={styles.formularzTytul}>Dodaj nowy wydatek</h2>

        <form onSubmit={dodajWydatek}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Kategoria *</label>
            <select name="kategoria" value={nowyWydatek.kategoria} onChange={handleInputChange} style={styles.select}>
              {kategorieLista.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Nazwa wydatku *</label>
            <input type="text" name="nazwa" value={nowyWydatek.nazwa} onChange={handleInputChange} style={styles.input} placeholder="np. Zakupy w Biedronce" required />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Kwota (PLN) *</label>
            <input type="text" name="kwota" value={nowyWydatek.kwota} onChange={handleInputChange} style={styles.input} placeholder="0.00" required />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Data</label>
            <input type="date" name="data" value={nowyWydatek.data} onChange={handleInputChange} style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Opis (opcjonalnie)</label>
            <textarea name="opis" value={nowyWydatek.opis} onChange={handleInputChange} style={styles.textarea} placeholder="Dodatkowe informacje..." />
          </div>

          <div style={styles.formularzPrzyciski}>
            <button type="submit" style={styles.przyciskZapisz}>💾 Zapisz</button>
            <button type="button" style={styles.przyciskAnuluj} onClick={() => setPokazFormularz(false)}>✖ Anuluj</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularzWydatek;