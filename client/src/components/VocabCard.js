import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import TinderCard from "react-tinder-card";
import { useTranslation } from "react-i18next";
import "../styles/VocabCard.css";
import PieChart from "./common/PieChart";

import angryPingu from "../images/PinguIcons/angryPingu.png";
import happyPingu from "../images/PinguIcons/happyPingu.png";
import excitedPingu from "../images/PinguIcons/excitedPingu.png";
import "../styles/Vocabulary.css";
const VocabCard = (props) => {
  const [t, i18n] = useTranslation("collection");
  const [vocabCollection, setVocabCollection] = useState(props.data);
  const [currentCard, setCurrentCard] = useState(1);
  const [appLanguage, setAppLanguage] = useState(i18n.language);
  const [isCollectionFinished, setIsCollectionFinished] = useState(false);
  const [goodCards, setGoodCards] = useState([]);
  const [badCards, setBadCards] = useState([]);
  const [cardStates, setCardStates] = useState(
    vocabCollection.map(() => ({ isFlipped: false, isCardRevealed: false }))
  );

  const flipCard = (index) => {
    const updatedCardStates = [...cardStates];
    updatedCardStates[index] = {
      isFlipped: !cardStates[index].isFlipped,
      isCardRevealed: true,
    };
    setCardStates(updatedCardStates);
  };

  const restartWithNewCards = (newCards) => {
    //reset States
    setGoodCards([]);
    setBadCards([]);
    setCurrentCard(1);
    setVocabCollection(newCards);
    setCardStates(
      vocabCollection.map(() => ({ isFlipped: false, isCardRevealed: false }))
    );
    setIsCollectionFinished(false);
  };

  //Add functionality for swiping to a side
  const onSwipe = (direction) => {
    if (direction === "right") {
      setGoodCards([...goodCards, vocabCollection[currentCard - 1]]);
    } else if (direction === "left") {
      setBadCards([...badCards, vocabCollection[currentCard - 1]]);
    }

    const updatedCardStates = [...cardStates];
    updatedCardStates[currentCard - 1] = {
      isFlipped: true,
      isCardRevealed: true,
    };
    setCardStates(updatedCardStates);
  };

  const onCardLeftScreen = () => {
    if (currentCard < vocabCollection.length) setCurrentCard(currentCard + 1);
    else if (props.isPreview) props.finishCollection();
    else setIsCollectionFinished(true);

    const updatedCardStates = [...cardStates];
    updatedCardStates[currentCard - 1] = {
      isFlipped: false,
      isCardRevealed: false,
    };
    setCardStates(updatedCardStates);
  };

  const getPieChartData = () => {
    const data = {
      values: [goodCards.length, badCards.length],
      labels: [t("collection.legendGood"), t("collection.legendBad")],
      colors: ["green", "red"],
    };
    return data;
  };

  const determinePingu = () => {
    const succesrate = goodCards.length / (goodCards.length + badCards.length);

    if (succesrate > 0.8) return excitedPingu;
    else if (succesrate > 0.6) return happyPingu;
    else return angryPingu;
  };

  const Card = ({ text, index }) => (
    <div className="card mx-auto responsive-width-card"  >
      <div
        className="card-body d-flex flex-column align-items-center justify-content-center "
        style={{ height: "60vh" }}
      >
        <h1
          className="card-text"
          style={{ wordWrap: "break-word", textAlign: "center" }}
        >
          {text}
        </h1>
      </div>
      <div className="card-footer text-center">
        <button className="btn pressable" onClick={() => flipCard(index)}>
          {t("card.revealButton")}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="text-center mt-3 mb-3 collection-name">
        {props.title}
        {` ${currentCard} / ${vocabCollection.length}`}
      </div>

      <div className="card-container-vocab">
        {!isCollectionFinished ? (
          vocabCollection.map((card, index) => (
            <TinderCard
              key={index}
              onSwipe={onSwipe}
              preventSwipe={["up", "down"]}
              onCardLeftScreen={() => onCardLeftScreen()}
              className="swipable-card"
              flickOnSwipe={cardStates[index].isFlipped}
            >
              <ReactCardFlip
                flipDirection="horizontal"
                isFlipped={cardStates[index].isFlipped}
              >
                <Card
                  text={appLanguage === "en" ? card.en : card.de}
                  index={index}
                />
                <Card
                  text={appLanguage === "en" ? card.de : card.en}
                  index={index}
                />
              </ReactCardFlip>
            </TinderCard>
          ))
        ) : (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: "100%" }}
          >
            <div className="vh100">
              <img
                src={determinePingu()}
                className="img-home user-select-none"
              ></img>
            </div>
            <PieChart
              data={getPieChartData()}
              title={t("collection.chartTitle")}
            />
            <div className="d-flex flex-row">
              <div className="m-2">
                <button
                  className="btn btn-outline-primary btn-lg"
                  disabled={badCards.length === 0}
                  onClick={() => restartWithNewCards(badCards)}
                >
                  {t("collection.restartBad")}
                </button>
              </div>
              <div className="m-2">
                <button
                  className="btn btn-outline-primary btn-lg"
                  disabled={goodCards.length === 0}
                  onClick={() => restartWithNewCards(goodCards)}
                >
                  {t("collection.restartGood")}
                </button>
              </div>
            </div>
            <div className="m-2">
              <button
                className="btn btn-outline-primary btn-lg"
                onClick={() => restartWithNewCards(vocabCollection)}
              >
                {t("collection.restart")}
              </button>
            </div>
            <button
              className="btn btn-outline-primary btn-lg m-2"
              onClick={() => props.finishCollection()}
            >
              {t("collection.endButton")}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default VocabCard;
