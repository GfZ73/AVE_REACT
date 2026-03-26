import React, { useState, useEffect } from 'react';
import LewyPanel from './LewyPanel';
import PrawyPanel from './PrawyPanel';
import FormularzWydatek from './FormularzWydatek';
import styles from './styles';
import FormularzEdycji from './FormularzEdycji';
import EdycjaParagonu from './EdycjaParagonu';

const StronaGlownaWydatki = ({ waluta, userId }) => {
  // --- Stany ---
  const [edycjaParagonu, setEdycjaParagonu] = useState(null);
  const [pokazEdycjeParagonu, setPokazEdycjeParagonu] = useState(false);
  const [edycjaWydatek, setEdycjaWydatek] = useState(null); 
  const [pokazFormularzEdycji, setPokazFormularzEdycji] = useState(false);
  const [aktywnaKategoria, setAktywnaKategoria] = useState('Wszystkie');
  const [zdjecie, setZdjecie] = useState(null);
  const [zdjecieFile, setZdjecieFile] = useState(null);
  const [kursy, setKursy] = useState({ PLN: 1, EUR: 0.22, USD: 0.25 });
  const [analiza, setAnaliza] = useState(null);
  const [ladowanieAI, setLadowanieAI] = useState(false);
  const [aktualnaOperacja, setAktualnaOperacja] = useState(null);
  const [pokazWyniki, setPokazWyniki] = useState(false);
  const [pokazFormularz, setPokazFormularz] = useState(false);
  const [ladowanie, setLadowanie] = useState(true);
  const [nowyWydatek, setNowyWydatek] = useState({
    kategoria: 'Jedzenie',
    nazwa: '',
    kwota: '',
    data: new Date().toISOString().split('T')[0],
    opis: ''
  });
  const [wydatki, setWydatki] = useState([]);
  
  const kategorieLista = ['Jedzenie','Transport','Rozrywka','Rachunki','Zdrowie','Edukacja','Odzież','Prezenty','Inne'];

  useEffect(() => {
    const pobierzWydatki = async () => {
      if (!userId) {
        console.log('Brak userId');
        setLadowanie(false);
        return;
      }

      try {
        console.log('Pobieram wydatki dla userId:', userId);
        const response = await fetch(`/expenses/${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setWydatki(data.wydatki || []);
        }
      } catch (error) {
        console.error('Błąd pobierania wydatków:', error);
      } finally {
        setLadowanie(false);
      }
    };

    pobierzWydatki();
  }, [userId]);

  // --- Przeliczanie i formatowanie ---
  const przeliczKwote = (kwota) => kwota * (kursy[waluta] || 1);
  const formatKwota = (kwota) =>
    przeliczKwote(kwota).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ` ${waluta}`;

  // --- Filtrowanie ---
  const kategorie = ['Wszystkie', ...new Set(wydatki.map(w => w.kategoria))];
  const przefiltrowaneWydatki = aktywnaKategoria === 'Wszystkie'
    ? wydatki
    : wydatki.filter(w => w.kategoria === aktywnaKategoria);
  const sumaWydatkow = przefiltrowaneWydatki.reduce((acc, w) => acc + w.kwota, 0);

  // Edycja
  const rozpocznijEdycje = (wydatek) => {
  console.log('Edytuję wydatek:', wydatek);
  setEdycjaWydatek({
    id: wydatek._id || wydatek.id,
    kategoria: wydatek.kategoria,
    nazwa: wydatek.nazwa,
    kwota: wydatek.kwota.toString(),
    data: wydatek.data.split('T')[0], // format YYYY-MM-DD
    opis: wydatek.opis || ''
  });
  setPokazFormularzEdycji(true);
};

// Funkcja obsługująca zmiany w formularzu edycji
const handleEdycjaChange = (e) => {
  const { name, value } = e.target;
  setEdycjaWydatek(prev => ({ ...prev, [name]: value }));
};

// Funkcja anulująca edycję
const anulujEdycje = () => {
  setPokazFormularzEdycji(false);
  setEdycjaWydatek(null);
};

// Funkcja zapisująca edytowany wydatek (TO JEST BRAKUJĄCA FUNKCJA)
const zapiszEdytowanyWydatek = async (e) => {
  e.preventDefault();
  
  if (!edycjaWydatek) return;
  
  const kwotaNum = parseFloat(edycjaWydatek.kwota.replace(',', '.'));
  if (!edycjaWydatek.nazwa || isNaN(kwotaNum) || kwotaNum <= 0) {
    return alert('Wypełnij poprawnie pola');
  }

  try {
    const response = await fetch(`/expenses/${edycjaWydatek.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
        kategoria: edycjaWydatek.kategoria,
        nazwa: edycjaWydatek.nazwa,
        kwota: kwotaNum,
        data: edycjaWydatek.data,
        opis: edycjaWydatek.opis || ''
      })
    });

    const data = await response.json();
    
    if (data.success) {
      setWydatki(prev => prev.map(w => 
        (w._id === edycjaWydatek.id || w.id === edycjaWydatek.id) 
          ? { ...w, ...data.wydatek }
          : w
      ));
      
      setPokazFormularzEdycji(false);
      setEdycjaWydatek(null);
      alert('✅ Wydatek zaktualizowany');
    } else {
      alert('Nie udało się zaktualizować wydatku');
    }
  } catch (error) {
    console.error('Błąd aktualizacji wydatku:', error);
    alert('Błąd podczas aktualizacji wydatku');
  }
};
const rozpocznijEdycjeParagonu = () => {
  console.log('Kliknięto edycję paragonu', analiza);
  if (!analiza) {
    alert('Brak danych do edycji');
    return;
  }
  
  setEdycjaParagonu({
    sklep: analiza.sklep || '',
    suma: analiza.suma || 0,
    data: analiza.data || new Date().toISOString().split('T')[0],
    produkty: analiza.produkty || []
  });
  setPokazEdycjeParagonu(true);
};

// Funkcja obsługująca zmiany w polach paragonu
const handleEdycjaParagonuChange = (field, value) => {
  setEdycjaParagonu(prev => ({
    ...prev,
    [field]: value
  }));
};

// Funkcja obsługująca zmiany w produktach
const handleProduktChange = (index, field, value) => {
  setEdycjaParagonu(prev => {
    const noweProdukty = [...prev.produkty];
    noweProdukty[index] = {
      ...noweProdukty[index],
      [field]: field === 'cena' ? parseFloat(value) || 0 : value
    };
    return {
      ...prev,
      produkty: noweProdukty,
      suma: noweProdukty.reduce((acc, p) => acc + (p.cena || 0), 0)
    };
  });
};

// Funkcja dodająca nowy produkt
const dodajProdukt = () => {
  setEdycjaParagonu(prev => ({
    ...prev,
    produkty: [...prev.produkty, { nazwa: '', cena: 0, kategoria: 'Inne' }]
  }));
};

// Funkcja usuwająca produkt
const usunProdukt = (index) => {
  setEdycjaParagonu(prev => {
    const noweProdukty = prev.produkty.filter((_, i) => i !== index);
    return {
      ...prev,
      produkty: noweProdukty,
      suma: noweProdukty.reduce((acc, p) => acc + (p.cena || 0), 0)
    };
  });
};

// Funkcja zapisująca edytowane dane paragonu
const zapiszEdycjeParagonu = () => {
  if (!edycjaParagonu) return;
  
  setAnaliza({
    sklep: edycjaParagonu.sklep,
    suma: edycjaParagonu.suma,
    data: edycjaParagonu.data,
    produkty: edycjaParagonu.produkty
  });
  
  setPokazEdycjeParagonu(false);
  setEdycjaParagonu(null);
};

// Funkcja anulująca edycję paragonu
const anulujEdycjeParagonu = () => {
  setPokazEdycjeParagonu(false);
  setEdycjaParagonu(null);
};

  // --- Funkcje ---
  const handleZdjecieUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setZdjecieFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setZdjecie(reader.result);
        setPokazWyniki(false);
        setAnaliza(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const usunZdjecie = () => { 
    setZdjecie(null); 
    setZdjecieFile(null); 
    setAnaliza(null); 
    setPokazWyniki(false); 
  };

  // --- ANALIZA OCR (dotychczasowa) ---
  const analizujZdjecieOCR = async () => {
     console.log('=== OCR KLIKNIĘTY ===');
  console.log('1. zdjecieFile:', zdjecieFile ? 'jest' : 'brak');
    if (!zdjecieFile) return;
     console.log('2. Ustawiam ladowanieAI na TRUE');
    setLadowanieAI(true);
    setAktualnaOperacja('ocr');
    setPokazWyniki(false);
    console.log('3. Po ustawieniu - ladowanieAI:', true);
     try {
    const reader = new FileReader();
    reader.readAsDataURL(zdjecieFile);
    reader.onloadend = async () => {
      console.log('4. Plik wczytany, wysyłam zapytanie');
      const base64Image = reader.result.split(',')[1];
      const response = await fetch('/api/analyze-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image })
      });
      const data = await response.json();
      console.log('5. Otrzymano odpowiedź:', data);
      
      if (data.success) { 
        setAnaliza(data.dane); 
        setPokazWyniki(true); 
        console.log('6. Ustawiono wyniki');
      } else {
        alert('Nie udało się przeanalizować zdjęcia');
      }
      setLadowanieAI(false);
      setAktualnaOperacja(null);
      console.log('7. Wyłączono ładowanie');
    };
  } catch (error) {
    console.error('Błąd:', error);
    alert('Błąd podczas analizy zdjęcia');
    setLadowanieAI(false);
    setAktualnaOperacja(null);
  }
};

  // --- ANALIZA CHATGPT (nowa) ---
  const analizujZdjecieChatGPT = async () => {
  console.log('=== ChatGPT KLIKNIĘTY ===');
  console.log('1. zdjecieFile:', zdjecieFile);
  
  if (!zdjecieFile) {
    console.log('Brak pliku');
    alert('Najpierw dodaj zdjęcie');
    return;
  }
  
  console.log('2. Ustawiam stany ładowania');
  setLadowanieAI(true);
  setAktualnaOperacja('chatgpt');
  setPokazWyniki(false);
  
  try {
    console.log('3. Odczytuję plik');
    const reader = new FileReader();
    reader.readAsDataURL(zdjecieFile);
    
    reader.onloadend = async () => {
      console.log('4. Plik wczytany, przygotowuję dane');
      const base64Image = reader.result.split(',')[1];
      console.log('5. Wysyłam zapytanie do /analyze-receipt-gpt');
      
      try {
        const response = await fetch('/analyze-receipt-gpt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image })
        });
        
        console.log('6. Status odpowiedzi:', response.status);
        
        const data = await response.json();
        console.log('7. Otrzymane dane:', data);
        
        if (data.success) {
          console.log('8. Sukces, parsuję odpowiedź');
          try {
            // Sprawdź czy data.result to string czy już obiekt
            let gptResult;
            if (typeof data.result === 'string') {
              gptResult = JSON.parse(data.result);
            } else {
              gptResult = data.result;
            }
            
            console.log('9. Sparsowany wynik:', gptResult);
            
            const przetworzoneDane = {
              suma: gptResult.items?.reduce((acc, item) => acc + item.price, 0) || 0,
              sklep: gptResult.store || gptResult.sklep || "Paragon",
              data: new Date().toISOString().split('T')[0],
              produkty: gptResult.items?.map(item => ({
                nazwa: item.name || item.nazwa,
                cena: item.price || item.cena,
                kategoria: item.category || item.kategoria || 'Inne'
              })) || []
            };
            
            console.log('10. Przetworzone dane:', przetworzoneDane);
            setAnaliza(przetworzoneDane);
            setPokazWyniki(true);
          } catch (e) {
            console.error("Błąd parsowania JSON z ChatGPT:", e);
            alert("Nie udało się przetworzyć odpowiedzi z ChatGPT. Sprawdź format danych.");
          }
        } else {
          console.log('11. Błąd w odpowiedzi:', data.error);
          alert('Nie udało się przeanalizować zdjęcia przez ChatGPT: ' + (data.error || 'Nieznany błąd'));
        }
      } catch (fetchError) {
        console.error('12. Błąd fetch:', fetchError);
        alert('Błąd połączenia z serwerem');
      } finally {
        console.log('13. Wyłączam ładowanie');
        setLadowanieAI(false);
        setAktualnaOperacja(null);
      }
    };
    
    reader.onerror = (error) => {
      console.error('Błąd odczytu pliku:', error);
      alert('Nie udało się odczytać pliku');
      setLadowanieAI(false);
      setAktualnaOperacja(null);
    };
    
  } catch (error) {
    console.error('14. Błąd główny:', error);
    alert('Błąd podczas analizy zdjęcia');
    setLadowanieAI(false);
    setAktualnaOperacja(null);
  }
};

  // --- ZATWIERDZANIE WYNIKU Z PARAGONU (zapis do bazy) ---
  const zatwierdzWynik = async () => {
    if (!analiza) return;
    if (!userId) {
      alert('Brak ID użytkownika - zaloguj się ponownie');
      return;
    }
    
    try {
      const nowyWydatekDB = {
        userId: userId,
        kategoria: 'Jedzenie',
        nazwa: `Zakupy - ${analiza.sklep || 'Paragon'}`,
        kwota: analiza.suma || 0,
        data: analiza.data || new Date().toISOString().split('T')[0],
        produkty: analiza.produkty || [],
        zdjecieUrl: zdjecie,
        paragonDane: analiza
      };

      const response = await fetch('/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nowyWydatekDB)
      });

      const data = await response.json();
      
      if (data.success) {
        setWydatki(prev => [data.wydatek, ...prev]);
        setPokazWyniki(false);
        setZdjecie(null);
        setZdjecieFile(null);
        alert(`✅ Dodano wydatek: ${formatKwota(analiza.suma || 0)}`);
      } else {
        alert('Nie udało się dodać wydatku');
      }
    } catch (error) {
      console.error('Błąd dodawania wydatku:', error);
      alert('Błąd podczas dodawania wydatku');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNowyWydatek(prev => ({ ...prev, [name]: value }));
  };

  // --- RĘCZNE DODAWANIE WYDATKU (zapis do bazy) ---
  const dodajWydatek = async (e) => {
    e.preventDefault();
    
    const kwotaNum = parseFloat(nowyWydatek.kwota.replace(',', '.'));
    if (!nowyWydatek.nazwa || isNaN(kwotaNum) || kwotaNum <= 0) {
      return alert('Wypełnij poprawnie pola');
    }
    
    if (!userId) {
      alert('Brak ID użytkownika - zaloguj się ponownie');
      return;
    }

    try {
      const nowyWydatekDB = {
        userId: userId,
        kategoria: nowyWydatek.kategoria,
        nazwa: nowyWydatek.nazwa,
        kwota: kwotaNum,
        data: nowyWydatek.data,
        opis: nowyWydatek.opis || ''
      };

      const response = await fetch('/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nowyWydatekDB)
      });

      const data = await response.json();
      
      if (data.success) {
        setWydatki(prev => [data.wydatek, ...prev]);
        setNowyWydatek({ 
          kategoria: 'Jedzenie', 
          nazwa: '', 
          kwota: '', 
          data: new Date().toISOString().split('T')[0], 
          opis: '' 
        });
        setPokazFormularz(false);
      } else {
        alert('Nie udało się dodać wydatku');
      }
    } catch (error) {
      console.error('Błąd dodawania wydatku:', error);
      alert('Błąd podczas dodawania wydatku');
    }
  };

  // --- USUWANIE WYDATKU (z bazy) ---
  const usunWydatek = async (id) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten wydatek?')) return;
    
    try {
      const response = await fetch(`/expenses/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success) {
        setWydatki(prev => prev.filter(w => w._id !== id && w.id !== id));
      } else {
        alert('Nie udało się usunąć wydatku');
      }
    } catch (error) {
      console.error('Błąd usuwania wydatku:', error);
      alert('Błąd podczas usuwania wydatku');
    }
  };

  // --- Dynamiczne kursy ---
  useEffect(() => {
    const fetchKursy = async () => {
      try {
        const res = await fetch("https://api.nbp.pl/api/exchangerates/tables/A/?format=json");
        const data = await res.json();
        const rates = data[0].rates;
        const eur = rates.find(r => r.code === "EUR")?.mid;
        const usd = rates.find(r => r.code === "USD")?.mid;
        const gbp = rates.find(r => r.code === "GBP")?.mid;
        setKursy({ 
          PLN: 1, 
          EUR: eur ? 1/eur : 0.22, 
          USD: usd ? 1/usd : 0.25, 
          GBP: gbp ? 1/gbp : 0.19 
        });
      } catch(e){ 
        console.error(e); 
      }
    };
    fetchKursy();
    const interval = setInterval(fetchKursy, 300000);
    return () => clearInterval(interval);
  }, []);

  if (ladowanie) {
    return (
      <div style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginTop: '50px',
        padding: '20px',
        backgroundColor: '#111',
        borderRadius: '10px',
        maxWidth: '400px',
        margin: '50px auto'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
        <div>Ładowanie wydatków...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <LewyPanel 
        zdjecie={zdjecie}
        handleZdjecieUpload={handleZdjecieUpload}
        usunZdjecie={usunZdjecie}
        analizujZdjecieOCR={analizujZdjecieOCR}        // ← zmieniona nazwa
        analizujZdjecieChatGPT={analizujZdjecieChatGPT} // ← nowy props
        ladowanieAI={ladowanieAI}
        aktualnaOperacja={aktualnaOperacja}
        pokazWyniki={pokazWyniki}
        analiza={analiza}
        zatwierdzWynik={zatwierdzWynik}
        waluta={waluta}
        formatKwota={formatKwota}
        rozpocznijEdycjeParagonu={rozpocznijEdycjeParagonu}
      />
      <PrawyPanel 
        kategorie={kategorie}
        aktywnaKategoria={aktywnaKategoria}
        setAktywnaKategoria={setAktywnaKategoria}
        przefiltrowaneWydatki={przefiltrowaneWydatki}
        sumaWydatkow={sumaWydatkow}
        formatKwota={formatKwota}
        dodajRęcznie={() => setPokazFormularz(true)}
        usunWydatek={usunWydatek}
        edytujWydatek={rozpocznijEdycje}
      />
      <FormularzWydatek 
        pokazFormularz={pokazFormularz}
        setPokazFormularz={setPokazFormularz}
        nowyWydatek={nowyWydatek}
        handleInputChange={handleInputChange}
        dodajWydatek={dodajWydatek}
        kategorieLista={kategorieLista}
      />
      <FormularzEdycji  // ← NOWY KOMPONENT
      pokazFormularzEdycji={pokazFormularzEdycji}
      edycjaWydatek={edycjaWydatek}
      handleEdycjaChange={handleEdycjaChange}
      zapiszEdytowanyWydatek={zapiszEdytowanyWydatek}
      anulujEdycje={anulujEdycje}
      kategorieLista={kategorieLista}
    />
     <EdycjaParagonu
      pokazEdycjeParagonu={pokazEdycjeParagonu}
      edycjaParagonu={edycjaParagonu}
      handleEdycjaParagonuChange={handleEdycjaParagonuChange}
      handleProduktChange={handleProduktChange}
      dodajProdukt={dodajProdukt}
      usunProdukt={usunProdukt}
      zapiszEdycjeParagonu={zapiszEdycjeParagonu}
      anulujEdycjeParagonu={anulujEdycjeParagonu}
      kategorieLista={kategorieLista}
      formatKwota={formatKwota}
      />
    </div>
  );
};

export default StronaGlownaWydatki;