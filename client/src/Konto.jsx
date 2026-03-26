import React, { useState, useEffect } from 'react';
import { stylesKonto } from './styleskonto';
import Statystyki from './Statystyki';
import DaneOsobowe from './DaneOsobowe';
import Bezpieczenstwo from './Bezpieczenstwo';
import Preferencje from './Preferencje';

const Konto = ({ user, onLogout, }) => {
  const [daneUzytkownika, setDaneUzytkownika] = useState({
    login: user?.login || '',
    email: user?.email || '',
    imie: user?.imie || '',
    nazwisko: user?.nazwisko || '',
    dataRejestracji: user?.dataRejestracji || new Date().toISOString().split('T')[0],
  });

  const [edycja, setEdycja] = useState(false);
  const [formData, setFormData] = useState({ ...daneUzytkownika });
  const [statystyki, setStatystyki] = useState({
  sumaWydatkow: 0
});

const [wydatki, setWydatki] = useState([]);
const [kategorieMiesiac, setKategorieMiesiac] = useState({});
const [wybranyMiesiac, setWybranyMiesiac] = useState(new Date().getMonth());
const [wybranyRok, setWybranyRok] = useState(new Date().getFullYear());
const [daneRoczne, setDaneRoczne] = useState([]);
const miesiace = [
"Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec",
"Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"
];
const miesiaceNazwy = [
"Sty","Lut","Mar","Kwi","Maj","Cze",
"Lip","Sie","Wrz","Paź","Lis","Gru"
];

useEffect(() => {

  const pobierzWydatki = async () => {

    if (!user?.id) return;

    try {

      const response = await fetch(`/expenses/${user.id}`);
      const data = await response.json();

      if (data.success) {
        setWydatki(data.wydatki);
      }

    } catch (error) {
      console.error("Błąd pobierania wydatków:", error);
    }

  };

  pobierzWydatki();

}, [user]);
useEffect(() => {
  if (!wydatki || wydatki.length === 0) {
    setStatystyki({ sumaWydatkow: 0 });
    setKategorieMiesiac({});
    return;
  }

  const wydatkiZMiesiaca = wydatki.filter(w => {
    const data = new Date(w.data);
    return data.getMonth() === wybranyMiesiac;
  });

  const sumaWydatkow = Number(wydatkiZMiesiaca.reduce((acc, w) => acc + Number(w.kwota), 0).toFixed(2));

  const kategorie = {};
  wydatkiZMiesiaca.forEach(w => {
    const aktualna = kategorie[w.kategoria] || 0;

    kategorie[w.kategoria] = Number(
      (aktualna + Number(w.kwota)).toFixed(2)
    );
  });
  
  setStatystyki({ sumaWydatkow });
  setKategorieMiesiac(kategorie);

}, [wydatki, wybranyMiesiac]);
useEffect(() => {
  if (!wydatki || wydatki.length === 0) {
    setDaneRoczne([]);
    return;
  }

  const miesiace = Array(12).fill(0);

  wydatki.forEach(w => {
    const data = new Date(w.data);
    if (data.getFullYear() === wybranyRok) {
      miesiace[data.getMonth()] += Number(w.kwota);
    }
  });

  const dane = miesiace.map((kwota, i) => ({
    miesiac: miesiaceNazwy[i],
    kwota: Number(kwota.toFixed(2))
  }));

  setDaneRoczne(dane);

}, [wydatki, wybranyRok]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleZapisz = () => {
    setDaneUzytkownika(formData);
    setEdycja(false);
  };

  return (
    <div style={stylesKonto.container}>
      <div style={stylesKonto.header}>
        <div style={stylesKonto.avatar}>
          {daneUzytkownika.login?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <div style={stylesKonto.nazwaUzytkownika}>
            {daneUzytkownika.login || 'Użytkownik'}
            <span style={stylesKonto.badge}>Aktywny</span>
          </div>
          <div style={{ color: '#999', marginTop: '5px' }}>
            Członek od: {new Date(daneUzytkownika.dataRejestracji).toLocaleDateString('pl-PL')}
          </div>
        </div>
      </div>
      <Statystyki
  statystyki={statystyki}
  kategorieMiesiac={kategorieMiesiac}
  wybranyMiesiac={wybranyMiesiac}
  setWybranyMiesiac={setWybranyMiesiac}
  miesiace={miesiace}
  daneRoczne={daneRoczne}
  wybranyRok={wybranyRok}
  setWybranyRok={setWybranyRok}
/>
  

      <DaneOsobowe
        daneUzytkownika={daneUzytkownika}
        formData={formData}
        setFormData={setFormData}
        edycja={edycja}
        setEdycja={setEdycja}
        handleInputChange={handleInputChange}
        handleZapisz={handleZapisz}
        styles={stylesKonto}
      />
      <Bezpieczenstwo onLogout={onLogout} styles={stylesKonto} />
      <Preferencje styles={stylesKonto} />
    </div>
  );
};

export default Konto;