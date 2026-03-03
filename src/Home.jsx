import { useState } from "react";

function Home() {
  const [activeCategory, setActiveCategory] = useState("home");

  const renderContent = () => {
    if (activeCategory === "home") {
      return (
        <>
          <h1>Witaj na stronie głównej! 👋</h1>
          <p>Jesteś zalogowany ✅</p>
        </>
      );
    }

    if (activeCategory === "about") {
      return (
        <>
          <h1>O nas</h1>
          <p>Tutaj możesz dodać informacje o swojej stronie lub projekcie.</p>
        </>
      );
    }

    if (activeCategory === "contact") {
      return (
        <>
          <h1>Kontakt</h1>
          <p>Skontaktuj się z nami pod adresem email@example.com</p>
        </>
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#121212",
        color: "white",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Pasek nawigacji */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
          borderBottom: "1px solid #333",
        }}
      >
        <button onClick={() => setActiveCategory("home")}>Strona główna</button>
        <button onClick={() => setActiveCategory("about")}>O nas</button>
        <button onClick={() => setActiveCategory("contact")}>Kontakt</button>
      </div>

      {/* Treść */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
}

export default Home;