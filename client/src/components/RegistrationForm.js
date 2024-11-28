import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import countries from "i18n-iso-countries";
import langs from "langs";
import Select from "react-select";
import LoadingSpinner from "./common/LoadingSpinner";
import "../styles/ProfilePage.css";

countries.registerLocale(require("i18n-iso-countries/langs/de.json"));
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const countryOptions = Object.entries(
  countries.getNames("en", { select: "official" })
).map(([code, name]) => ({ value: code, label: name }));

/*
const languageOptions = langs
  .all()
  .map(({ name, 1: code }) => ({ value: code, label: name }));
*/
const languageOptions = [
  { value: "de", label: "Deutsch" },
  { value: "gb", label: "English" },
];

/**
 * @returns {JSX.Element} - Das Registrierungsformular.
 */
function Registration() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [t] = useTranslation("form");

  // * Die folgenden States speichern die Eingaben des Nutzers.
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [nativeLanguages, setNativeLanguages] = useState([]);
  const [learningLanguages, setLearningLanguages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleNext = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (step === 1) {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URI}/validateRegistration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.errors) {
        setErrors(data.errors);
      } else {
        setIsLoading(false);
        setStep(2);
      }
    } else if (step === 2) {
      // * Validierung der Registrierungsdaten.

      // * Die Registrierungsdaten werden an den Server gesendet.
      await fetch(`${process.env.REACT_APP_SERVER_URI}/registration`,
         {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // * Die Registrierungsdaten werden als JSON an den Server gesendet.
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
          country,
          nativeLanguages,
          learningLanguages,
        }),
      })
        .then((res) => {
          // * Bei erfolgreicher Registrierung wird der Nutzer auf die Login-Seite weitergeleitet.
          if (res.status === 201) {
            console.log("Registrierung erfolgreich");
            navigate("/login");
            return res.json();

            // * Bei fehlgeschlagener Registrierung wird eine Fehlermeldung ausgegeben.
          } else {
            console.error("Registrierung fehlgeschlagen:", res.status);
          }
        })

        // * Wenn die Antwort des Servers nicht in JSON umgewandelt werden kann, wird eine Fehlermeldung ausgegeben.
        .catch((error) => {
          console.error(
            "Fehler beim Senden des Registrierungs-Formulars:",
            error
          );
        });

      console.log(country, nativeLanguages, learningLanguages);
      navigate("/login");
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const isStep1Complete =
    username !== "" &&
    email !== "" &&
    password !== "" &&
    confirmPassword !== "";
  const isStep2Complete =
    country !== "" &&
    nativeLanguages.length > 0 &&
    learningLanguages.length > 0;

    if (isLoading) {
      return <LoadingSpinner />
    }
  // * HTML-Formular zur Registrierung.
  return (
    <div
      className="bg-light p-3 rounded text-dark"
      style={{ minWidth: "28vw" }}
    >
      {step === 1 && (
        <div className="d-flex flex-column m-1">
          <div className="d-flex flex-column m-1">
            <label className="mb-1" htmlFor="username">
              {t("registration.username")}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username}</p>
            )}
          </div>
          <div className="d-flex flex-column m-1">
            <label className="mb-1" htmlFor="email">
              {t("registration.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div className="d-flex flex-column m-1">
            <label className="mb-1" htmlFor="password">
              {t("registration.password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>
          <div className="d-flex flex-column m-1">
            <label className="mb-1" htmlFor="confirmPassword">
              {t("registration.passwordConfirm")}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="d-flex flex-column m-1">
          <div className="d-flex flex-column m-1">
            <label className="mb-1" htmlFor="country">
              {t("registration.country")}
            </label>
            <Select
              className="text-start"
              value={countryOptions.find((option) => option.value === country)}
              onChange={(option) => setCountry(option.value)}
              options={countryOptions}
            />
          </div>
          <div className="d-flex flex-column m-1">
            <label className="mb-1" htmlFor="nativeLanguages">
              {t("registration.nativeLanguages")}
            </label>
            <Select
              value={languageOptions.find(
                (option) => option.value === nativeLanguages
              )}
              onChange={(option) =>
                setNativeLanguages(option.value)
              }
              options={languageOptions}
             /*  isMulti */
            />
          </div>
          <div className="d-flex flex-column m-1">
            <label className="mb-1" htmlFor="learningLanguages">
              {t("registration.learningLanguages")}
            </label>
            <Select
              value={languageOptions.find(
                (option) => option.value === learningLanguages
              )}
              onChange={(option) =>
                setLearningLanguages(option.value)
              }
              options={languageOptions}
             /*  isMulti */
            />
          </div>
        </div>
      )}
      {step === 2 && (
        <button onClick={handleBack} className="btn btn-primary m-3">
          {t("registration.back")}
        </button>
      )}
      <button
        onClick={handleNext}
        className="btn btn-primary m-3"
        disabled={
          (step === 1 && !isStep1Complete) || (step === 2 && !isStep2Complete)
        }
      >
        {step === 1 ? t("registration.next") : t("registration.register")}
      </button>
    </div>
  );
}

export default Registration;
