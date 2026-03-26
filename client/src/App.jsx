import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { useState, useEffect } from "react";
import Login from "./Login";
import Home from "./Home";
import About from "./about";
import Contact from "./contact";
import StronaGlownaWydatki from "./StronaGlownaWydatki";
import Konto from "./Konto";
import Navbar from "./navbar";
import "./index.css";

function App() {
  const [uzytkownik, setUzytkownik] = useState(null);
  const [waluta, setWaluta] = useState('PLN');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUzytkownik(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUzytkownik(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUzytkownik(null);
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="wave-container">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      {uzytkownik && <Navbar waluta={waluta} setWaluta={setWaluta} />}

      <div style={{ 
        paddingTop: uzytkownik ? "80px" : "20px",
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}>
        <div style={{ 
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px"
        }}>
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            
            {uzytkownik && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/wydatki" element={
                  <StronaGlownaWydatki 
                    waluta={waluta} 
                    userId={uzytkownik.id}
                  />} 
                />
                <Route path="/konto" element={
                  <Konto 
                    user={uzytkownik}
                    onLogout={handleLogout}
                  />
                } />
              </>
            )}
            
            {!uzytkownik && (
              <Route path="*" element={<Login onLogin={handleLogin} />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;