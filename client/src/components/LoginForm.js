import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const [errors, setErrors] = useState({});
  const [isLoading,setIsLoading] = useState(false);

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
    setIsLoading(true);
    setErrors({});
    // * Die Login-Daten werden an den Server gesendet.
    const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });
    console.log(response);
    const data = await response.json();

    if (data.errors) {
      console.log(data.errors);
      setErrors(data.errors);
    } else {
      setIsLoading(false);
      navigate("/home");
    }
  };

  const isFormComplete = () => {
    return username.length > 0 && password.length > 0;
  };
  if (isLoading) {
    return (
      <div className=" vh-100 d-flex flex-column align-items-center justify-content-center">
        <div
          className="spinner-border text-primary "
          style={{ width: "6rem", height: "6rem" }}
        ></div>
        <p className="text-light">Loading Data...</p>
        <p>Es kann bis zur einer Minute dauern.</p>
      </div>
    );
  }
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
        disabled={!isFormComplete()}>
        Login
      </button>
    </form>
  );
}

export default Login;
