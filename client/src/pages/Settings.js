import NavigationBar from "../components/NavigationBar";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

import countries from "i18n-iso-countries";
import { useTranslation } from "react-i18next";
import langs from "langs";
import Select from "react-select";

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

function Settings() {
  const [tp] = useTranslation("mainPages");
  const { user, setUser } = useContext(UserContext);
  const { targetLanguage, nativeLanguage, setLanguages } = useLanguage();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [country, setCountry] = useState(null);
  const [nativeLanguagev, setNativeLanguagev] = useState(null);
  const [learningLanguages, setLearningLanguages] = useState(null);
  const [biography, setBiography] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }
  let userCountry = countryOptions;
  let userNativeLanguage = languageOptions;
  let userLearningLanguages = languageOptions;
  let userId = user._id;
  if (user) {
    userCountry = countryOptions.filter(
      (country) => country.value === user.country
    );
    userNativeLanguage = user.nativeLanguage.map((lang) =>
      languageOptions.find((language) => language.value === lang)
    );
    userLearningLanguages = user.learningLanguages.map((lang) =>
      languageOptions.find((language) => language.value === lang)
    );
    if (biography === null) {
      setBiography(user.biography);
    }
    if (email === null) {
      setEmail(user.email);
    }
    if (username === null) {
      setUsername(user.username);
    }
    if (country === null) {
      setCountry(user.country);
    }
    if (nativeLanguagev === null) {
      setNativeLanguagev(user.nativeLanguage);
    }
    if (learningLanguages === null) {
      setLearningLanguages(user.learningLanguages);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          userId,
          username: username !== user.username ? username : undefined,
          email,
          biography,
          country,
          nativeLanguagev,
          learningLanguages,
        }),
      });

      if (response.status === 200) {
        console.log("Update successful!");

        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setLanguages(
          data.user.learningLanguages[0],
          data.user.nativeLanguage[0]
        );
        console.log(data.user);
        navigate("/profile");
      } else {
        const errorMessage = await response.json();
        console.error(
          `Update failed: ${response.status} - ${JSON.stringify(errorMessage)}`
        );
        setErrorMessage(errorMessage.message);
      }
    } catch (error) {
      console.error("Error when sending the update form:", error);
    }
  };
  const settingsHeadline = {
    en: "Settings",
    de: "Einstellungen",
  };
  const nativeLanguageHeadline = {
    en: "Native language",
    de: "Muttersprache",
  };
  const learningLanguageHeadline = {
    en: "Learning language",
    de: "Lernsprache",
  };
  const userCountryHeadline = {
    en: "Country",
    de: "Land",
  };
  const biographyHeadline = {
    en: "Biography",
    de: "Biografie",
  };
  const userNameHeadline = {
    en: "Username",
    de: "Benutzername",
  };
  const keySettings = settingsHeadline[nativeLanguage] || "Settings";
  const keyNativeLanguage =
    nativeLanguageHeadline[nativeLanguage] || "Native language";
  const keyLearningLanguage =
    learningLanguageHeadline[nativeLanguage] || "Learning language";
  const keyCountry = userCountryHeadline[nativeLanguage] || "Country";
  const keyBiography = biographyHeadline[nativeLanguage] || "Biography";
  const keyUserName = userNameHeadline[nativeLanguage] || "Username";
  // * HTML code of the Settings page.

  return (
    {
      /**
       * Bootstrap css classes cheat sheet:
       * https://getbootstrap.com/docs/5.0/examples/cheatsheet/
       */
    },
    (
      <>
        {/**
         * The Navbar component is displayed at the top of the Home page.
         */}
        <NavigationBar className="mb-5" />

        <div className="d-flex flex-column align-items-center text-center mt-5 w-100">
          <h1 className="text-center display-3">{tp("settings.headline")}</h1>

          <form
            onSubmit={handleSubmit}
            className="bg-light p-3 m-5 rounded text-dark text-center form-size"
          >
            <img
              src={user.profilePicture512}
              alt="Profilbild"
              className="rounded-circle img-fluid w-25 shadow-sm"
            />

            <div className="d-flex flex-column text-align-items justify-content-center text-start mb-3">
              <span className="">{tp("settings.userName")}</span>
              <input
                className="form-control text-start"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errorMessage && (
                <div className="alert alert-danger mt-2 mb-0" role="alert">
                  {errorMessage}
                </div>
              )}
            </div>

            <div className="d-flex flex-column text-align-items justify-content-center text-start mb-3">
              <span className="">Email</span>
              <input
                className="form-control text-start "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="d-flex flex-column text-align-items justify-content-center text-start mb-3">
              <span className="">{tp("settings.bio")}</span>
              <textarea
                className="form-control text-start"
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
              />
            </div>

            <div className="d-flex flex-column m-1 mb-3  text-start">
              <span className="">{tp("settings.country")}</span>
              <Select
                className="text-start"
                placeholder={userCountry[0].label}
                defaultValue={userCountry[0].label}
                value={countryOptions.find(
                  (option) => option.value === country
                )}
                onChange={(option) => setCountry(option.value)}
                options={countryOptions}
              />
            </div>

            <div className="d-flex flex-column m-1 mb-3  text-start">
              <span className="">{tp("settings.nativeLang")}</span>
              <Select
                placeholder={userNativeLanguage[0].label}
                defaultValue={userNativeLanguage[0].label}
                value={languageOptions.find(
                  (option) => option.value === nativeLanguagev
                )}
                onChange={(option) =>
                  setNativeLanguagev(option.map((option) => option.value))
                }
                options={languageOptions}
                isMulti
              />
            </div>

            <div className="d-flex flex-column m-1 mb-3  text-start">
              <span className="">{tp("settings.learningLang")}</span>
              <Select
                placeholder={userLearningLanguages[0].label}
                defaultValue={userLearningLanguages[0].label}
                value={languageOptions.find(
                  (option) => option.value === learningLanguages
                )}
                onChange={(option) =>
                  setLearningLanguages(option.map((option) => option.value))
                }
                options={languageOptions}
                isMulti
              />
            </div>

            <button className="btn btn-primary btn-lg m-3" type="submit">
              {tp("settings.save")}
            </button>
          </form>
        </div>
      </>
    )
  );
}

export default Settings;
