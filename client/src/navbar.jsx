import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ waluta, setWaluta }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div style={{ 
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      background: "#222", 
      color: "white", 
      padding: "10px 20px",
      zIndex: 1000,
      boxSizing: "border-box",
    }}>
      
      {/* Logo / nazwa */}
      <div 
        onClick={toggleDropdown} 
        style={{ 
          fontWeight: "bold", 
          fontSize: "20px", 
          cursor: "pointer", 
          display: "inline-block"
        }}
      >
        Moja Strona
      </div>

      {/* Menu rozwijane w dół po kliknięciu nazwy */}
      <div
        style={{
          position: "absolute",
          top: "50px",
          left: "20px",
          width: "200px",
          background: "#444",
          color: "white",
          borderRadius: "10px",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          maxHeight: dropdownOpen ? "250px" : "0",
          zIndex: 1001,
        }}
      >
        {[{ to: "/wydatki", label: "Panel Wydatków" },
          { to: "/konto", label: "👤 Moje Konto" },
          { to: "/services", label: "Usługi" },
          { to: "/blog", label: "Blog" },
          { to: "/faq", label: "FAQ" }].map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              display: "block",
              padding: "10px 20px",
              textDecoration: "none",
              color: "white",
              borderBottom: index < 3 ? "1px solid white" : "none",
              margin: "0 20px",
              ...(item.to === "/konto" ? { 
                backgroundColor: "#555",
                fontWeight: "bold" 
              } : {})
            }}
            onClick={() => setDropdownOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Hamburger + wybór waluty */}
      <div style={{ position: "absolute", top: "15px", right: "20px", display: "flex", alignItems: "center", gap: "10px", zIndex: 1001 }}>
        
        {/* Wybór waluty */}
        <select 
          value={waluta} 
          onChange={(e) => setWaluta(e.target.value)}
          style={{
            background: "#333",
            color: "white",
            border: "1px solid #555",
            borderRadius: "5px",
            padding: "3px 6px",
            cursor: "pointer",
          }}
        >
          <option value="PLN">🇵🇱 PLN</option>
          <option value="EUR">🇪🇺 EUR</option>
          <option value="USD">🇺🇸 USD</option>
          <option value="GBP">🇬🇧 GBP</option>
        </select>

        {/* Hamburger */}
        <div
          onClick={toggleMenu}
          style={{
            width: "30px",
            height: "25px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <span style={{ height: "3px", background: "white", borderRadius: "2px" }}></span>
          <span style={{ height: "3px", background: "white", borderRadius: "2px" }}></span>
          <span style={{ height: "3px", background: "white", borderRadius: "2px" }}></span>
        </div>
      </div>

      {/* Pasek wysuwany z prawej */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: menuOpen ? 0 : "-250px",
          height: "100%",
          width: "250px",
          background: "#333",
          color: "white",
          paddingTop: "60px",
          transition: "right 0.3s ease",
          display: "flex",
          flexDirection: "column",
          zIndex: 999,
        }}
      >
        <Link to="/home" style={{ padding: "15px 20px", textDecoration: "none", color: "white" }} onClick={() => setMenuOpen(false)}>Strona główna</Link>
        <Link to="/about" style={{ padding: "15px 20px", textDecoration: "none", color: "white" }} onClick={() => setMenuOpen(false)}>O nas</Link>
        <Link to="/contact" style={{ padding: "15px 20px", textDecoration: "none", color: "white" }} onClick={() => setMenuOpen(false)}>Kontakt</Link>
        <Link to="/wydatki" style={{ padding: "15px 20px", textDecoration: "none", color: "white" }} onClick={() => setMenuOpen(false)}>Panel Wydatków</Link>
      </div>
    </div>
  );
}

export default Navbar;