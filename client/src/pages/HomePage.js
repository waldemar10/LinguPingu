import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import happyPingu from "../images/PinguIcons/happyPingu.png";
import "../styles/Home.css";
import LoadingSpinner from "../components/LoadingSpinner";
import UserService from "../services/UserService";

/**
 * @returns {JSX.Element} The Home page component.
 */
const HomePage = () => {
  const [t] = useTranslation("mainPages");
  const navigate = useNavigate();
  // * The randomSlogan variable is used to display a random slogan on the Home page.
  const postTexts = {
    de: [
      "Sprachen lernen mit Spaß, so leicht wie ein Pinguin auf dem Eis!",
      "Dein Weg zum Sprachprofi: Wo Wissen fliegt wie ein Pinguin durchs Wasser!",
      "Werde sprachlich fit - weil Pinguine wissen, wie man sich verständigt",
      "Wo Sprachen lernen genauso cool ist wie ein Pinguin im Frack!",
      "Dein Eisberg der Sprachkenntnisse: Wir begleiten dich bis zur Spitze!",
      "Sprachen lernen leicht gemacht: Jede Lektion wird zum Pinguin-Plausch!",
      "Fließend wie ein Pinguin im Wasser: Sprachenlernen wird zum Vergnügen!",
      "Weil Sprachenlernen genauso aufregend ist wie die Reise eines Pinguins!",
      "Dein treuer Begleiter auf dem Weg zum Sprachmeister!",
      "Sprachen lernen wird zum witzigen Abenteuer - so wie bei einem Pinguin auf Entdeckungstour!",
    ],
    en: [
      "Learn languages with fun, as easy as a penguin on the ice!",
      "Your path to language mastery: Where knowledge flows like a penguin through the water!",
      "Become linguistically fit - because penguins know how to communicate",
      "Where learning languages is as cool as a penguin in a tuxedo!",
      "Your iceberg of language skills: We accompany you to the top!",
      "Learning languages made easy: Every lesson becomes a penguin chat!",
      "Fluent like a penguin in the water: Learning languages becomes a pleasure!",
      "Because learning languages is as exciting as a penguin's journey!",
      "Your loyal companion on the way to language mastery!",
      "Learning languages becomes a fun adventure - just like a penguin on a discovery tour!",
    ],
  };

  // * The UserContext is used to access the user data.
  const [loadingUser, setLoadingUser] = useState(false);
  const [randomSlogan, setRandomSlogan] = useState("");

  const {
    appLanguage,
    setAppLanguage,
    setLearningLanguage,
    setNativeLanguage,
  } = useContext(LanguageContext);


  const fetchUserData = async () => {
    setLoadingUser(true);
    try {
      UserService.getUser().then((res) => {
      const sessionItems = {
        username: res.data.username,
        biography: res.data.biography,
        profilePicture64: res.data.profilePicture64,
        profilePicture512: res.data.profilePicture512,
        country: res.data.country,
        verified: res.data.verified,
        learningLanguages: res.data.learningLanguages[0] === "gb" ? "en" : res.data.learningLanguages[0],
        nativeLanguage: res.data.nativeLanguage,
      };
      Object.entries(sessionItems).forEach(([key, value]) => {
        sessionStorage.setItem(key, value);
      });
      if(localStorage.getItem(`${res.data.username}_appLanguage`) === null){
      localStorage.setItem(`${res.data.username}_appLanguage`, res.data.nativeLanguage[0]);
      }
      setLearningLanguage(res.data.learningLanguages[0] ? "gb" : "en");
      setNativeLanguage(res.data.nativeLanguage[0]);
      setAppLanguage(res.data.appLanguage);
    }).catch((error) => {
      if(error.response.status === 401){
        navigate("/landing");
      }
      console.error("Fetch error:", error);
    });
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    const requiredKeys = ["username", "learningLanguages", "nativeLanguage"];
  const isSessionStorageEmpty = requiredKeys.some((key) => !sessionStorage.getItem(key));
    if (isSessionStorageEmpty || localStorage.getItem(`${sessionStorage.getItem("username")}_appLanguage`) === null) {
      fetchUserData();
    } else {
      setLearningLanguage(sessionStorage.getItem("learningLanguages"));
      setNativeLanguage(sessionStorage.getItem("nativeLanguage"));
      setAppLanguage(localStorage.getItem(`${sessionStorage.getItem("username")}_appLanguage`));
    }
    if (postTexts[appLanguage]) {
      const selectedSlogans = postTexts[appLanguage];
      setRandomSlogan(
        selectedSlogans[Math.floor(Math.random() * selectedSlogans.length)]
      );
    } else {
      const selectedSlogans = postTexts["en"];
      setRandomSlogan(
        selectedSlogans[Math.floor(Math.random() * selectedSlogans.length)]
      );
    }
  }, []);


  if (loadingUser) {
    return <LoadingSpinner />;
  }

  // * HTML code of the HomePage component.
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center g-0">
        {/**
         * The Navbar component is displayed at the top of the Home page.
         */}
        <NavigationBar className="mb-5" />

        {/**
         * Big "LinuPingu" headline of the Home page.
         */}
        <div className="d-flex flex-column mt-5">
          <h1
            className="text-center w-100 display-1"
            /*  style={{ fontSize: "7rem" }} */
          >
            LinguPingu
          </h1>
          {/**
           * Slogan of the Home page.
           */}
          <p className="text-center fs-5 text-white mt-3">{randomSlogan}</p>

        </div>
        <div className="vh100">
          <img src={happyPingu} className="img-home user-select-none"></img>
        </div>

        <div className="home-box mt-4">
          <Link
            className="btn home-button bg-home-button text-white btn-hover text-uppercase"
            to="/games">
            <h3>{t("homePage.gamesHeadline")}</h3>
          </Link>

          <Link
            className="btn home-button bg-home-button text-white btn-hover text-uppercase"
            to="/vocabulary">
            <h3>{t("homePage.vocabularyHeadline")}</h3>
          </Link>

          <Link
            className="btn home-button bg-home-button text-white btn-hover text-uppercase"
            to="/grammar">
            <h3>{t("homePage.grammarHeadline")}</h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
