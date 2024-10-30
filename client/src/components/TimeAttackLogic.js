import React, { useEffect, useState, useRef } from "react";
import Flag from "react-world-flags";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import angryPingu from "../images/PinguIcons/angryPingu.png";
import happyPingu from "../images/PinguIcons/happyPingu.png";
import sweatingPingu from "../images/PinguIcons/sweatingPingu.png";
import askingPingu from "../images/PinguIcons/askingPingu.png";

import "../styles/TimeAttack.css";

const Game = (props) => {
  const [t] = useTranslation("games");
  const [timer, setTimer] = useState(props.data.length * 10); // 10s pro Wort
  const [data, setData] = useState(props.data);
  const [userInput, setUserInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [countdownId, setCountdownId] = useState(null);
  const [initialCollectionLength, setInitialCollectionLength] = useState(
    props.data.length
  );
  const [translation, setTranslation] = useState(
    Math.random() < 0.5 ? "de" : "en"
  );
  const [showPingu, setShowPingu] = useState(false);
  const [pinguIcon, setPinguIcon] = useState(sweatingPingu);

  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef) inputRef.current.focus();

    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setCountdownId(id);

    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (timer === 0 || isGameOver) {
      setIsGameOver(true);
      setShowPingu(true);
      setPinguIcon(sweatingPingu);
      clearInterval(countdownId);
    }
  }, [timer, isGameOver, countdownId]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    setInitialCollectionLength(initialCollectionLength - 1);
    const currentWord =
      data[currentWordIndex][translation === "de" ? "en" : "de"];
    if (userInput === currentWord) {
      setCorrect((prevSubmissions) => [...prevSubmissions, currentWord]);
      setShowPingu(true);
      setPinguIcon(happyPingu);
    } else {
      setIncorrect((prevSubmissions) => [
        ...prevSubmissions,
        { word: currentWord, userInput: userInput },
      ]);
      setShowPingu(true);
      setPinguIcon(angryPingu);
    }

    setCurrentWordIndex((prevIndex) => prevIndex + 1);
    setUserInput("");

    if (currentWordIndex === data.length - 1) {
      setIsGameOver(true);
    } else {
      inputRef.current.focus();
    }
  };

  const handleSkipWord = () => {
    setData((prevData) => [...prevData, data[currentWordIndex]]);
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
    setUserInput("");
    inputRef.current.focus();
    setShowPingu(true);
    setPinguIcon(askingPingu);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-80">
      {showPingu && (
        <div className="vh100">
          <img src={pinguIcon} className="img-home user-select-none"></img>
        </div>
      )}
      <div className="gameContainer">
        <h1 className="headLine">Time Attack</h1>
        {!isGameOver && (
          <p
            className="timer"
            style={{
              color: timer < (props.data.length * 10) / 4 ? "red" : "white",
            }}
          >
            {timer}
          </p>
        )}
        {!isGameOver && (
          <p>
            {t("timeAttack.cardsLeft")}: {initialCollectionLength}
          </p>
        )}
        <p>
          {t("timeAttack.correct")}: {correct.length}
        </p>
        {currentWordIndex < data.length && !isGameOver ? (
          <div>
            <p>
              {t("timeAttack.translateP1")}
              <div className="d-flex justify-content-center align-items-center">
                <b className="wordHighlight m-2">
                  {data[currentWordIndex][translation]}
                </b>
                :{" "}
                <Flag
                  code={translation === "de" ? "gb" : "de"}
                  height="64"
                  className="m-2"
                />
              </div>
            </p>
            <div className="input-group mb-3">
              <input
                className="form-control"
                aria-label="userInput"
                aria-describedby="basic-addon2"
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder={t("timeAttack.placeholder")}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={handleSubmit}
                >
                  {t("submit")}
                </button>
              </div>
            </div>
            <button className="btn btn-secondary m-2" onClick={handleSkipWord}>
              {t("skip")}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsGameOver(true)}
            >
              {t("end")}
            </button>
          </div>
        ) : (
          <div>
            <p>
              Game Over! <br /> Score:{" "}
              {`${correct.length}/${correct.length + incorrect.length}`}
            </p>

            <button
              className="btn btn-outline-primary btn-lg m-2"
              onClick={() => navigate("/games")}
            >
              {t("backToGames")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
