import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import { useTranslation } from "react-i18next";
import "../styles/MemoryCard.css";

const MemoryCard = (props) => {
  const { handleChoice, data, flipped,setIsWrong } = props;
  const [t, i18n] = useTranslation("collection");
  const [vocab, setVocab] = useState(props.data);
  const [isCollectionFinished, setIsCollectionFinished] = useState(false);
  
  const [cardState, setCardState] = useState({
    isFlipped: false,
    isCardRevealed: false,
  });
  const [isFlipped, setCardFlipped] = useState(false);

  const flipCard = (data) => {
    if (data?.matched) {
      return;
    }
    data.isFlipped = !data.isFlipped;
    // * Gefixt
    // * Bei data handelt es sich um die ganze Karte in Z. 61 und 62 wird es übergeben. Kannst du gerne anpassen
    handleChoice(data);
  };

  // * HTML-Struktur einer Memorie-Karte
  const Card = ({ text, data }) => (
    <div className="card mx-auto" style={{ maxWidth: "70%" }}>
      <div
        onClick={() => flipCard(data)}
        className={`card-body d-flex flex-column align-items-center justify-content-center ${setIsWrong ? 'wrong' : ''}`}
        style={{ height: "200px" }}
      >
        <h1 className="card-text">{text}</h1>
      </div>
    </div>
  );

  return (
    <div className="card-container">
      {!isCollectionFinished ? (
        <ReactCardFlip
          className={flipped ? isFlipped[true] : isFlipped[false]}
          flipDirection="horizontal"
          isFlipped={data.isFlipped}
          flipSpeedBackToFront={0.6}
          flipSpeedFrontToBack={0.6}
        >
          <Card className="back" text={""} data={props.data} alt="card-back" />
          <Card
            className="front"
            text={props.term}
            data={props.data}
            alt="card-front"
          />
        </ReactCardFlip>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100%" }}
        >
          <button
            className="btn btn-outline-primary btn-lg m-2"
            onClick={() => props.finishCollection()}
          >
            {t("card.endButton")}
          </button>
        </div>
      )}
    </div>
  );
};
export default MemoryCard;
