import React from "react";
import ReactDOM from "react-dom/client";
import process from 'process';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import swDev from "./swDev";

import { LanguageProvider } from "./context/LanguageContext";
import { DataProvider } from "./context/DataContext";
import { UserProvider } from "./context/UserContext";
//Import translation files
import collection_de from "./translations/de/collection.json";
import collection_en from "./translations/en/collection.json";
import form_de from "./translations/de/form.json";
import form_en from "./translations/en/form.json";
import mainPages_de from "./translations/de/mainPages.json";
import mainPages_en from "./translations/en/mainPages.json";
import profile_de from "./translations/de/profile.json";
import profile_en from "./translations/en/profile.json";
import games_de from "./translations/de/games.json";
import games_en from "./translations/en/games.json";
import grammarhub_de from "./translations/de/grammarHub.json";
import grammarhub_en from "./translations/en/grammarHub.json";

const appLanguage = localStorage.getItem("appLanguage");

i18next.init({
  interpolation: { escapeValue: true },
  lng: appLanguage ? appLanguage : "de",
  resources: {
    en: {
      collection: collection_en,
      form: form_en,
      mainPages: mainPages_en,
      profile: profile_en,
      games: games_en,
      grammarHub: grammarhub_en,
    },
    de: {
      collection: collection_de,
      form: form_de,
      mainPages: mainPages_de,
      profile: profile_de,
      games: games_de,
      grammarHub: grammarhub_de,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

swDev(); // Service Worker registration
root.render(
  <React.StrictMode>
    <UserProvider>
      <I18nextProvider i18n={i18next}>
        <DataProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </DataProvider>
      </I18nextProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
