import NavigationBar from "../components/NavigationBar";
import { useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import countries from "i18n-iso-countries";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import "../styles/ProfilePage.css";

countries.registerLocale(require("i18n-iso-countries/langs/de.json"));
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const countryOptions = Object.entries(
  countries.getNames("en", { select: "official" })
).map(([code, name]) => ({ value: code, label: name }));

const languageOptions = [
  { value: "de", label: "Deutsch" },
  { value: "gb", label: "English" },
];

function Settings() {
  const [tp] = useTranslation("mainPages");
  const [user, setUser] = useState(null); 

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [country, setCountry] = useState(null);
  const [nativeLanguage, setNativeLanguage] = useState(null);
  const [learningLanguages, setLearningLanguages] = useState(null);
  const [learningLanguagesText, setLearningLanguagesText] = useState(null);
  const [nativeLanguageText, setNativeLanguageText] = useState(null);
  const [biography, setBiography] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();
  const fetchProtectedData = async () => {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URI}/protected`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
      navigate("/landing");
    } 
  };
  useEffect(() => {
    fetchProtectedData();
  }, []);
  const fetchUserData = async () => {
    setLoadingUser(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/user`, {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setUser(data);
      setBiography(data.biography || "");
      setEmail(data.email || "");
      setUsername(data.username || "");
      setCountry(data.country || "");
      setNativeLanguage(data.nativeLanguage || []);
      setLearningLanguages(data.learningLanguages || []);
      switch (data.learningLanguages[0]){
        case "de":
          setLearningLanguagesText("Deutsch");
          break;
        case "gb":
          setLearningLanguagesText("English");
          break;
        default:
          setLearningLanguagesText("X");
          break;
      }
      switch (data.nativeLanguage[0]){
        case "de":
          setNativeLanguageText("Deutsch");
          break;
        case "gb":
          setNativeLanguageText("English");
          break;
        default:
          setNativeLanguageText("X");
          break;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoadingUser(false);
      
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  if (loadingUser) {
    return (
      <div className=" vh-100 d-flex flex-column align-items-center justify-content-center">
        <div
          className="spinner-border text-primary "
          style={{ width: "6rem", height: "6rem" }}
        ></div>
        {loadingUser && <p className="text-light">Loading User...</p>}
      </div>
    );
  }
  let userCountry = countryOptions;
 
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/updateUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          username: username !== user.username ? username : undefined,
          email,
          biography,
          country,
          nativeLanguage,
          learningLanguages,
        }),
        credentials: 'include',
      });

      if (response.status === 200) {
        console.log("Update successful!");
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("profilePicture64", user.profilePicture64);
        sessionStorage.setItem("learningLanguages", learningLanguages);
        sessionStorage.setItem("nativeLanguage", nativeLanguage);
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
                placeholder={nativeLanguageText}
                defaultValue={nativeLanguageText}
                value={languageOptions.find(
                  (option) => option.value === nativeLanguage
                )}
                onChange={(option) =>
                  setNativeLanguage(option.value)
                }
                options={languageOptions}
              />
            </div>

            <div className="d-flex flex-column m-1 mb-3  text-start">
              <span className="">{tp("settings.learningLang")}</span>
              <Select
                placeholder={learningLanguagesText}
                defaultValue={learningLanguagesText}
                value={languageOptions.find(
                  (option) => option.value === learningLanguages
                )}
                onChange={(option) =>
                  setLearningLanguages(option.value)
                }
                options={languageOptions}
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
