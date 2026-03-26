import React from 'react';
import styles from './styles';

const FormularzEdycji = ({ 
  pokazFormularzEdycji, 
  edycjaWydatek, 
  handleEdycjaChange, 
  zapiszEdytowanyWydatek, 
  anulujEdycje,
  kategorieLista 
}) => {
  // Jeśli formularz nie ma być pokazany lub nie ma danych do edycji, nie renderuj nic
  if (!pokazFormularzEdycji || !edycjaWydatek) return null;

  return (
    <div style={styles.formularzOverlay} onClick={anulujEdycje}>
      <div style={styles.formularz} onClick={e => e.stopPropagation()}>
        <h2 style={styles.formularzTytul}>Edytuj wydatek</h2>

        <form onSubmit={zapiszEdytowanyWydatek}>
          {/* Kategoria */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Kategoria *</label>
            <select 
              name="kategoria" 
              value={edycjaWydatek.kategoria} 
              onChange={handleEdycjaChange} 
              style={styles.select}
              required
            >
              {kategorieLista.map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          {/* Nazwa wydatku */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Nazwa wydatku *</label>
            <input 
              type="text" 
              name="nazwa" 
              value={edycjaWydatek.nazwa} 
              onChange={handleEdycjaChange} 
              style={styles.input} 
              placeholder="np. Zakupy w Biedronce" 
              required 
            />
          </div>

          {/* Kwota */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Kwota (PLN) *</label>
            <input 
              type="text" 
              name="kwota" 
              value={edycjaWydatek.kwota} 
              onChange={handleEdycjaChange} 
              style={styles.input} 
              placeholder="0.00" 
              required 
            />
          </div>

          {/* Data */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Data</label>
            <input 
              type="date" 
              name="data" 
              value={edycjaWydatek.data} 
              onChange={handleEdycjaChange} 
              style={styles.input} 
              required 
            />
          </div>

          {/* Opis */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Opis (opcjonalnie)</label>
            <textarea 
              name="opis" 
              value={edycjaWydatek.opis || ''} 
              onChange={handleEdycjaChange} 
              style={styles.textarea} 
              placeholder="Dodatkowe informacje..." 
            />
          </div>

          {/* Przyciski */}
          <div style={styles.formularzPrzyciski}>
            <button 
              type="submit" 
              style={styles.przyciskZapisz}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#219a52'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
            >
              💾 Zapisz zmiany
            </button>
            <button 
              type="button" 
              style={styles.przyciskAnuluj}
              onClick={anulujEdycje}
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

export default FormularzEdycji;