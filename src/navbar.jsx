import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ padding: "20px", textAlign: "center", background: "#222", color: "white" }}>
      <Link to="/Home" style={{ margin: "0 10px", color: "white" }}>Strona główna</Link>
      <Link to="/about" style={{ margin: "0 10px", color: "white" }}>O nas</Link>
      <Link to="/contact" style={{ margin: "0 10px", color: "white" }}>Kontakt</Link>
    </div>
  );
}

export default Navbar;