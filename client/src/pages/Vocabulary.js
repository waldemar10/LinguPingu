import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import vocabPingu from "../images/PinguIcons/vocabPingu.png";
import HeadLine from "../components/common/Headline";

import NavigationBar from "../components/NavigationBar";
import "../styles/Vocabulary.css";
const Vocabulary = () => {
  const [t_pages, i18n] = useTranslation("mainPages");
  const navigate = useNavigate();
  const buttonClass =
    "btn home-button bg-home-button text-white btn-hover text-uppercase";

  return (
    <div>
      <NavigationBar className="mb-5" />
      <HeadLine
        title={t_pages("vocabulary.title")}
        slogan={t_pages("vocabulary.slogan")}
      />
      <div className="vh100">
        <img src={vocabPingu} className="img-home user-select-none"></img>
      </div>
      <div className="d-flex justify-content-center align-items-center responsive-column">
        <div className="d-flex flex-column align-items-center">
          <button
            className={`${buttonClass} home-rectangle-big`}
            onClick={() => navigate("/vocabulary/learn")}
          >
            {t_pages("vocabulary.learn")}
          </button>
        </div>
        <div className="d-flex flex-column align-items-center mx-2">
          <button
            className={`${buttonClass} home-rectangle-small`}
            onClick={() => navigate("/vocabulary/editCollection")}
          >
            {t_pages("vocabulary.editCollection")}
          </button>
          <button
            className={`${buttonClass} home-rectangle-small`}
            onClick={() => navigate("/vocabulary/createCollection")}
          >
            {t_pages("vocabulary.createCollection")}
          </button>
        </div>
        <div className="d-flex flex-column align-items-center">
          <button
            className={`${buttonClass} home-rectangle-small`}
            onClick={() => navigate("/vocabulary/editCard")}
          >
            {t_pages("vocabulary.editCard")}
          </button>
          <button
            className={`${buttonClass} home-rectangle-small`}
            onClick={() => navigate("/vocabulary/createCard")}
          >
            {t_pages("vocabulary.createCard")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vocabulary;
