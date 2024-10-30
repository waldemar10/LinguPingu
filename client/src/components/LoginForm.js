import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/UserContext";

/**
 *
 * @returns {JSX.Element} - Das Login-Formular.
 */
function Login() {
  // * useTranslation() ermöglicht die Verwendung von Übersetzungen.
  const [t] = useTranslation("form");

  // * useNavigate() ermöglicht das Weiterleiten auf eine andere Seite.
  const navigate = useNavigate();

  // * Die folgenden States speichern die Eingaben des Nutzers.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // * Der UserContext wird verwendet, um den Nutzer nach dem Login zu speichern.
  const { login } = useContext(UserContext);

  const [errors, setErrors] = useState({});

  // * Die folgenden Funktionen aktualisieren die States, wenn sich die Eingaben des Nutzers ändern.
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // * Sendet die Login-Daten an den Server und leitet bei Erfolg auf die Landing-Seite weiter.
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Login-Formular wurde abgeschickt!");

    setErrors({});
    // * Die Login-Daten werden an den Server gesendet.
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    console.log(response);

    console.log(data);

    if (data.errors) {
      console.log(data.errors);
      setErrors(data.errors);
    } else {
      console.log(data.user);
      const userData = data.user;
      login(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/home");
    }
  };

  const isFormComplete = () => {
    return username.length > 0 && password.length > 0;
  };

  // * HTML-Code des Login-Formulars.
  return (
    <form className="bg-light p-3 rounded" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username" className="text-dark">
          {t("userName")}
        </label>
        <input
          className="form-control"
          placeholder={t("userName")}
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />{" "}
        <span className="text-danger">{errors.username}</span>
      </div>
      <div className="form-group">
        <label htmlFor="password" className="text-dark">
          {t("password")}
        </label>
        <input
          className="form-control"
          placeholder={t("password")}
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <span className="text-danger">{errors.password}</span>
      </div>
      <button
        className="btn btn-primary m-3"
        type="submit"
        disabled={!isFormComplete()}
      >
        Login
      </button>
    </form>
  );
}

export default Login;
