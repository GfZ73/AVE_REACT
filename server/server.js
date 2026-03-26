require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const axios = require('axios');
const Tesseract = require('tesseract.js');
const OpenAI = require('openai');
const path = require('path'); // ← DODANE

// ============ INICJALIZACJA APLIKACJI ============
const app = express();

// ============ KONFIGURACJA CORS ============
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://cesural-lakia-gastric.ngrok-free.dev',
    /\.ngrok-free\.dev$/,
    // DODAJEMY ADRES Z RENDER PO DEPLOYU (będziesz mógł dodać później)
    /\.onrender\.com$/
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

// ============ POŁĄCZENIE Z MONGODB ============
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected ✅"))
  .catch((err) => console.log("MongoDB Atlas error ❌", err));

// ============ KONFIGURACJA OPENAI ============
const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY
});

// ============ MODEL UŻYTKOWNIKA ============
const UserSchema = new mongoose.Schema({
  login: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true, sparse: true },
  googleId: { type: String, unique: true, sparse: true },
  imie: String,
  nazwisko: String,
  avatar: String,
  dataRejestracji: { type: Date, default: Date.now },
  ostatnieLogowanie: Date,
  preferencje: {
    powiadomieniaEmail: { type: Boolean, default: true },
    cotygodniowePodsumowanie: { type: Boolean, default: false },
  }
});
const User = mongoose.model("User", UserSchema);

// ============ MODEL WYDATKÓW ============
const WydatekSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  kategoria: { type: String, required: true },
  nazwa: { type: String, required: true },
  kwota: { type: Number, required: true },
  data: { type: String, required: true },
  opis: String,
  produkty: [{
    nazwa: String,
    cena: Number,
    ilosc: Number
  }],
  zdjecieUrl: String,
  paragonDane: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

WydatekSchema.index({ userId: 1, data: -1 });
WydatekSchema.index({ userId: 1, kategoria: 1 });

const Wydatek = mongoose.model("Wydatek", WydatekSchema);

// ============ ENDPOINTY UŻYTKOWNIKA ============

// Rejestracja
app.post("/register", async (req, res) => {
  const { login, password, email, imie, nazwisko } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ 
      login, 
      password: hashed,
      email,
      imie,
      nazwisko,
      dataRejestracji: new Date()
    });
    res.json({ 
      success: true, 
      message: "Rejestracja udana",
      user: {
        id: user._id,
        login: user.login,
        email: user.email,
        imie: user.imie,
        nazwisko: user.nazwisko
      }
    });
  } catch (err) {
    res.json({ success: false, message: "Błąd lub login zajęty" });
  }
});

// Logowanie
app.post("/login", async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login });
  if (!user) return res.json({ success: false, message: "Nie znaleziono użytkownika" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.json({ success: false, message: "Hasło nieprawidłowe" });

  user.ostatnieLogowanie = new Date();
  await user.save();

  res.json({ 
    success: true, 
    message: "Login success",
    user: {
      id: user._id,
      login: user.login,
      email: user.email,
      imie: user.imie,
      nazwisko: user.nazwisko,
      dataRejestracji: user.dataRejestracji
    }
  });
});

// Logowanie przez Google
app.post("/auth/google", async (req, res) => {
  const { googleId, email, imie, nazwisko, avatar } = req.body;
  
  try {
    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    
    if (!user) {
      user = await User.create({
        googleId,
        email,
        imie,
        nazwisko,
        login: email.split('@')[0],
        avatar,
        dataRejestracji: new Date(),
        ostatnieLogowanie: new Date()
      });
    } else {
      user.googleId = googleId;
      user.avatar = avatar;
      user.ostatnieLogowanie = new Date();
      await user.save();
    }
    
    res.json({
      success: true,
      user: {
        id: user._id,
        login: user.login,
        email: user.email,
        imie: user.imie,
        nazwisko: user.nazwisko,
        avatar: user.avatar,
        dataRejestracji: user.dataRejestracji
      }
    });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Błąd logowania przez Google" });
  }
});

// Pobierz dane użytkownika
app.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.json({ success: false, message: "Użytkownik nie istnieje" });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: "Błąd pobierania danych" });
  }
});

// Aktualizuj dane użytkownika
app.put("/user/:userId", async (req, res) => {
  try {
    const { imie, nazwisko, email, preferencje } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { 
        imie, 
        nazwisko, 
        email,
        preferencje,
        updatedAt: new Date() 
      },
      { new: true }
    ).select('-password');
    
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: "Błąd aktualizacji" });
  }
});

// ============ ENDPOINTY WYDATKÓW ============

// Dodaj wydatek
app.post("/expenses", async (req, res) => {
  try {
    const { userId, kategoria, nazwa, kwota, data, opis, produkty, zdjecieUrl, paragonDane } = req.body;
    
    const nowyWydatek = new Wydatek({
      userId,
      kategoria,
      nazwa,
      kwota,
      data: data || new Date().toISOString().split('T')[0],
      opis,
      produkty,
      zdjecieUrl,
      paragonDane
    });

    await nowyWydatek.save();
    
    res.json({
      success: true,
      message: "Wydatek dodany",
      wydatek: nowyWydatek
    });
  } catch (error) {
    console.error("❌ Błąd dodawania wydatku:", error);
    res.status(500).json({
      success: false,
      error: "Nie udało się dodać wydatku"
    });
  }
});

// Pobierz wszystkie wydatki użytkownika
app.get("/expenses/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const wydatki = await Wydatek.find({ userId }).sort({ data: -1 });
    
    const suma = wydatki.reduce((acc, w) => acc + w.kwota, 0);
    const kategorie = {};
    wydatki.forEach(w => {
      kategorie[w.kategoria] = (kategorie[w.kategoria] || 0) + 1;
    });
    
    const najczestszaKategoria = Object.keys(kategorie).length > 0 
      ? Object.keys(kategorie).reduce((a, b) => kategorie[a] > kategorie[b] ? a : b)
      : 'Brak';

    res.json({
      success: true,
      wydatki,
      statystyki: {
        suma,
        liczba: wydatki.length,
        najczestszaKategoria,
        ostatniWydatek: wydatki[0]?.data
      }
    });
  } catch (error) {
    console.error("❌ Błąd pobierania wydatków:", error);
    res.status(500).json({
      success: false,
      error: "Nie udało się pobrać wydatków"
    });
  }
});

// Pobierz wydatki z filtrowaniem po kategorii
app.get("/expenses/:userId/:kategoria", async (req, res) => {
  try {
    const { userId, kategoria } = req.params;
    const query = { userId };
    if (kategoria !== 'Wszystkie') {
      query.kategoria = kategoria;
    }
    
    const wydatki = await Wydatek.find(query).sort({ data: -1 });
    res.json({ success: true, wydatki });
  } catch (error) {
    res.status(500).json({ success: false, error: "Błąd pobierania" });
  }
});

// Usuń wydatek
app.delete("/expenses/:expenseId", async (req, res) => {
  try {
    await Wydatek.findByIdAndDelete(req.params.expenseId);
    res.json({ success: true, message: "Wydatek usunięty" });
  } catch (error) {
    console.error("❌ Błąd usuwania wydatku:", error);
    res.status(500).json({
      success: false,
      error: "Nie udało się usunąć wydatku"
    });
  }
});

// Aktualizuj wydatek
app.put("/expenses/:expenseId", async (req, res) => {
  try {
    const wydatek = await Wydatek.findByIdAndUpdate(
      req.params.expenseId,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, wydatek });
  } catch (error) {
    console.error("❌ Błąd aktualizacji wydatku:", error);
    res.status(500).json({
      success: false,
      error: "Nie udało się zaktualizować wydatku"
    });
  }
});

// ============ FUNKCJA DO PRZETWARZANIA TEKSTU Z PARAGONU ============
function przetworzParagon(tekst) {
  console.log("📝 Przetwarzanie tekstu:", tekst.substring(0, 200) + "...");
  
  const linie = tekst.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  let suma = 0;
  let sklep = "Nieznany";
  let data = new Date().toISOString().split('T')[0];
  const produkty = [];
  
  // Szukaj sumy
  const sumaMatch = tekst.match(/SUMA:?\s*PLN\s*(\d+[.,]\d+)/i) || 
                    tekst.match(/Razem:?\s*(\d+[.,]\d+)/i) ||
                    tekst.match(/Do\s*zapłaty:?\s*(\d+[.,]\d+)/i) ||
                    tekst.match(/(\d+[.,]\d+)\s*PLN/i);
  
  if (sumaMatch) {
    suma = parseFloat(sumaMatch[1].replace(',', '.'));
  }
  
  // Szukaj daty
  const dataMatch = tekst.match(/(\d{4}-\d{2}-\d{2})|(\d{2}\.\d{2}\.\d{4})|(\d{2}-\d{2}-\d{4})/);
  if (dataMatch) {
    data = dataMatch[0].replace(/\./g, '-');
  }
  
  // Szukaj nazwy sklepu (pierwsze linie)
  for (let i = 0; i < Math.min(5, linie.length); i++) {
    const linia = linie[i];
    if (linia && 
        linia.length > 3 && 
        linia.length < 50 && 
        !linia.includes('NIP') && 
        !linia.includes('ul.') &&
        !linia.includes('@') &&
        !linia.match(/\d+[.,]\d+/)) {
      sklep = linia.trim();
      break;
    }
  }
  
  // Szukaj produktów (linie z cenami)
  for (const linia of linie) {
    const produktMatch = linia.match(/([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+)\s+(\d+[.,]\d+)/);
    if (produktMatch && 
        !linia.toLowerCase().includes('suma') && 
        !linia.toLowerCase().includes('razem') &&
        !linia.toLowerCase().includes('zapłaty')) {
      produkty.push({
        nazwa: produktMatch[1].trim().substring(0, 30),
        cena: parseFloat(produktMatch[2].replace(',', '.'))
      });
    }
  }
  
  return {
    suma: suma || 0,
    sklep: sklep,
    data: data,
    produkty: produkty.slice(0, 15)
  };
}

// ============ ENDPOINT DO ANALIZY ZDJĘĆ (OCR) ============
app.post("/api/analyze-receipt", async (req, res) => {
  try {
    const { image } = req.body;
    
    console.log("📸 Analizowanie paragonu...");
    
    const imageBuffer = Buffer.from(image, 'base64');
    
    console.log("🔍 OCR - odczytywanie tekstu z obrazu...");
    
    const { data: { text } } = await Tesseract.recognize(
      imageBuffer,
      'pol+eng',
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            console.log(`📊 Postęp OCR: ${Math.round(m.progress * 100)}%`);
          }
        }
      }
    );
    
    console.log("✅ OCR zakończony");
    console.log("📄 Odczytywany tekst:", text.substring(0, 300) + "...");
    
    const dane = przetworzParagon(text);
    
    console.log("📊 Wynik analizy:", dane);
    
    res.json({
      success: true,
      dane: dane
    });

  } catch (error) {
    console.error("❌ Błąd analizy:", error);
    res.status(500).json({
      success: false,
      error: "Nie udało się przeanalizować obrazu"
    });
  }
});

// ============ ENDPOINT DO ANALIZY PARAGONÓW Z CHATGPT ===========
app.post("/analyze-receipt-gpt", async (req, res) => {
  try {
    const { image } = req.body;

    console.log("🤖 Analizowanie paragonu przez ChatGPT...");

    const response = await openai.responses.create({
      model: "gpt-5-nano", 
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
Przeanalizuj paragon i zwróć listę produktów.
Przypisz wydatki do jednej z kategorii:

jedzenie
transport
rachunki
rozrywka
zdrowie
inne

Zwróć odpowiedź jako JSON:

{
 "items":[
   {"name":"produkt","price":0,"category":"kategoria"}
 ]
}
`
            },
            {
              type: "input_image",
              image_url: `data:image/jpeg;base64,${image}` 
            }
          ]
        }
      ]
    });

    console.log("✅ Analiza ChatGPT zakończona");
    
    res.json({
      success: true,
      result: response.output_text
    });

  } catch (error) {
    console.error("❌ Błąd analizy ChatGPT:", error);
    res.status(500).json({
      success: false,
      error: "Nie udało się przeanalizować obrazu przez ChatGPT"
    });
  }
});

// ============ SERWOWANIE FRONTENDU ============
// TO JEST NAJWAŻNIEJSZA DODANA CZĘŚĆ!

// Serwuj statyczne pliki z folderu client/dist (po buildzie)
// Uwaga: ścieżka zakłada że folder client/dist jest na tym samym poziomie co server/
app.use(express.static(path.join(__dirname, '../client/dist')));

// Dla wszystkich ścieżek, które nie są API – zwróć index.html (React routing)
app.get('*', (req, res) => {
  // Pomijamy endpointy API
  if (req.path.startsWith('/api') || 
      req.path.startsWith('/expenses') || 
      req.path.startsWith('/login') || 
      req.path.startsWith('/register') || 
      req.path.startsWith('/auth') || 
      req.path.startsWith('/user') ||
      req.path.startsWith('/analyze-receipt-gpt')) {
    return;
  }
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// ============ URUCHOMIENIE SERWERA ============
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT} 🚀`));