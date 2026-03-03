import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import About from "./about.jsx";
import Contact from "./contact.jsx";
import Navbar from "./navbar.jsx";

function App() {
  return (
    <Router>
      {/* wirujące fale w tle */}
      <div className="wave-container">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

   <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;