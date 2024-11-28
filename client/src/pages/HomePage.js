import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/UserContext";
import { Slogans } from "../utils/slogansUtils";
import LoadingSpinner from "../components/common/LoadingSpinner";

import happyPingu from "../images/PinguIcons/happyPingu.png";
import "../styles/Home.css";

const HomePage = () => {
  const [t] = useTranslation("mainPages");
  const [randomSlogan, setRandomSlogan] = useState("");
  const { appLanguage } = useContext(LanguageContext);
  const { isLoadingUser } = useContext(UserContext);
  
  const setSlogan = () => {
    if (!Slogans[appLanguage]) return;
    const selectedSlogans = Slogans[appLanguage];
    setRandomSlogan(
      selectedSlogans[Math.floor(Math.random() * selectedSlogans.length)]
    );
  };

  useEffect(() => {
    setSlogan();
  }, [appLanguage]);

  if (isLoadingUser) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center g-0">
        <NavigationBar className="mb-5" />
        <div className="d-flex flex-column mt-5">
          <h1 className="text-center w-100 display-1">LinguPingu</h1>
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
