import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import happyPingu from "../images/PinguIcons/happyPingu.png";
import "../styles/Home.css";

/**
 * @returns {JSX.Element} The Home page component.
 */
const HomePage = () => {
  const [t, i18next] = useTranslation("mainPages");
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
  /* const { user } = useContext(UserContext); */
  /* const [user, setUser] = useState(null);  */
  // * The state of the header is used to determine whether the header should be displayed or not.
  const [showHeader, setShowHeader] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);
  const [randomSlogan, setRandomSlogan] = useState("");
  const { id, setId } = useContext(UserContext);
  const {
    appLanguage,
    setAppLanguage,
    setLearningLanguage,
    setNativeLanguage,
  } = useContext(LanguageContext);

  const fetchProtectedData = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    setLoadingUser(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/user`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setId(data._id);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("biography", data.biography);
      sessionStorage.setItem("profilePicture64", data.profilePicture64);
      sessionStorage.setItem("profilePicture512", data.profilePicture512);
      sessionStorage.setItem("country", data.country);
      sessionStorage.setItem("verified", data.verified);
      localStorage.setItem(`${data._id}_learningLanguages`, data.learningLanguages[0]);
      localStorage.setItem(`${data._id}_nativeLanguage`, data.nativeLanguage[0]);
      localStorage.setItem(`${data._id}_appLanguage`, data.nativeLanguage[0]);
      setLearningLanguage(data.learningLanguages[0]);
      setNativeLanguage(data.nativeLanguage[0]);
      setAppLanguage(data.appLanguage);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    if (
      !sessionStorage.getItem("username") ||
      !sessionStorage.getItem("profilePicture64") ||
      !sessionStorage.getItem("country")||
      !localStorage.getItem(`${id}_learningLanguages`)||
      !localStorage.getItem(`${id}_nativeLanguage`) ||
      !localStorage.getItem(`${id}_appLanguage`)
    ) {
      fetchUserData();
    } else {
      setLearningLanguage(localStorage.getItem(`${id}_learningLanguages`));
      setNativeLanguage(localStorage.getItem(`${id}_nativeLanguage`));
      setAppLanguage(localStorage.getItem(`${id}_appLanguage`));
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
  }, [navigate]);

  useEffect(() => {
    
    fetchProtectedData();
  }, [navigate]);

  if (loading || loadingUser) {
    return <div>Loading...</div>;
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
         * Header for the Home page.
         * The header is only displayed if the user is logged in and the account is not yet verified.
         * It can be closed by clicking on the close button.
         */}
        {sessionStorage.getItem("verified") && showHeader && (
          <div
            className="alert-width alert alert-v2 alert-warning d-inline-flex justify-content-between align-items-center py-2"
            role="alert"
            style={{ marginTop: "2rem", zIndex: "1" }}>
            <p className="mb-0 me-2 align-self-center">
              {t("homePage.verificationText")}
            </p>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowHeader(false)}></button>
          </div>
        )}

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

          {/**
           * Button that links to the MemoryGame page.
           */}
          {/*  <div className="d-flex justify-content-center mt-5">
            <Link
              className="btn btn-primary btn-lg mt-5"
              to="/collection/memory"
            >
              {"Memory"}
            </Link>
          </div> */}
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
