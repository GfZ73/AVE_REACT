import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();
      alert(data.message);
      if (data.message === "Login success") navigate("/home");
    } catch (err) {
      console.log(err);
      alert("Błąd logowania");
    }
  };

  const register = async () => {
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.log(err);
      alert("Błąd rejestracji");
    }
  };
const loginGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    alert("Zalogowano jako: " + result.user.displayName);
    navigate("/home");
  } catch (error) {
    console.log(error);
    alert("Błąd logowania Google");
  }
};
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "linear-gradient(135deg, #000000, #1e3c72)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.7)",
          minWidth: "320px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1 style={{ marginBottom: "30px" }}>Logowanie</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            style={{
              padding: "12px 15px",
              borderRadius: "12px",
              border: "1px solid #555",
              fontSize: "16px",
              backgroundColor: "#222",
              color: "white",
            }}
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px 15px",
              borderRadius: "12px",
              border: "1px solid #555",
              fontSize: "16px",
              backgroundColor: "#222",
              color: "white",
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "10px" }}>
            <button
              onClick={register}
              style={{
                flex: 1,
                padding: "14px 0",
                borderRadius: "50px",
                border: "none",
                background: "linear-gradient(135deg, #000000, #1e3c72)",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "linear-gradient(135deg, #1e3c72, #000000)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "linear-gradient(135deg, #000000, #1e3c72)")
              }
            >
              Rejestracja
            </button>

            <button
              onClick={loginUser}
              style={{
                flex: 1,
                padding: "14px 0",
                borderRadius: "50px",
                border: "none",
                background: "linear-gradient(135deg, #000000, #1e90ff)",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "linear-gradient(135deg, #1e90ff, #000000)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "linear-gradient(135deg, #000000, #1e90ff)")
              }
            >
              Logowanie
            </button>
          </div>
          <button
  onClick={loginGoogle}
  style={{
    marginTop: "15px",
    width: "100%",
    padding: "14px 0",
    borderRadius: "50px",
    border: "none",
    background: "linear-gradient(135deg, #000000, #4285F4)",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s"
  }}
  onMouseEnter={(e) =>
    (e.target.style.background = "linear-gradient(135deg, #4285F4, #000000)")
  }
  onMouseLeave={(e) =>
    (e.target.style.background = "linear-gradient(135deg, #000000, #4285F4)")
  }
>
  Zaloguj przez Google
</button>
        </div>
      </div>
    </div>
  );
}

export default Login;