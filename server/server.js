const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// Połącz z Atlas (bez dodatkowych opcji)
mongoose.connect(
  "mongodb+srv://GfZ_73:08775302Mm@cluster0.bwxelb0.mongodb.net/aveDB"
)
  .then(() => console.log("MongoDB Atlas connected ✅"))
  .catch((err) => console.log("MongoDB Atlas error ❌", err));

// Model użytkownika
const UserSchema = new mongoose.Schema({
  login: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", UserSchema);

// Rejestracja
app.post("/register", async (req, res) => {
  const { login, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await User.create({ login, password: hashed });
    res.json({ message: "Rejestracja udana" });
  } catch (err) {
    res.json({ message: "Błąd lub login zajęty" });
  }
});

// Logowanie
app.post("/login", async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login });
  if (!user) return res.json({ message: "Nie znaleziono użytkownika" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.json({ message: "Hasło nieprawidłowe" });

  res.json({ message: "Login success" });
});

app.listen(3000, () => console.log("Server running on port 3000 🚀"));