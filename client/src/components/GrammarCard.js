import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/LanguageContext";
import useShuffledWords from "../hooks/useShuffledWords";
import GrammarService from "../services/GrammarService";
import happyPingu from "../images/PinguIcons/happyPingu.png";
import sadPingu from "../images/PinguIcons/sadPingu.png";
import "../styles/Grammar.css";

function GrammarCard({ title, content, data, passIsFinished }) {
  const [t] = useTranslation("grammarHub");
  const { lessonIndex, grammarIndex } = useParams();
  const [selectedWords, setSelectedWords] = useState([]);
  const [isWrong, setIsWrong] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { nativeLanguage, learningLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  const {
    visibleWords,
    setVisibleWords,
    index,
    sentence,
    goToNextSentence,
    dontGoToNextSentence,
  } = useShuffledWords(content, learningLanguage);

  const TIMEOUT = 1500;

  const correctSentence = sentence
    ? sentence[learningLanguage].replace(/,/g, " ,")
    : "";

  const handleWordClick = (word) => {
    const allVisibleWords = [...visibleWords];
    const wordIndex = allVisibleWords.indexOf(word);
    if (wordIndex === -1) return; // If the word is not in the array, return

    allVisibleWords.splice(wordIndex, 1); // Remove the word from the array

    setVisibleWords(allVisibleWords);
    setSelectedWords([...selectedWords, word]);
    removeWordFromVisible(word);
  };

  const handleSelectedWordClick = (word) => {
    const allSelectedWords = [...selectedWords];
    const wordIndex = allSelectedWords.indexOf(word);
    if (wordIndex === -1) return;

    allSelectedWords.splice(wordIndex, 1);

    setSelectedWords(allSelectedWords);
    setVisibleWords([...visibleWords, word]);
  };

  const handleAnswerFeedback = (isCorrect) => {
    isCorrect ? setIsRight(true) : setIsWrong(true);
    setTimeout(() => {
      setIsRight(false);
      setIsWrong(false);
    }, TIMEOUT);
  };

  const removeWordFromVisible = (word) => {
    const index = visibleWords.indexOf(word);
    if (index === -1) return;

    const newVisibleWords = [...visibleWords];
    newVisibleWords.splice(index, 1);
    setVisibleWords(newVisibleWords);
  };
  const disableCheckAnswerButton = () => {
    setIsButtonDisabled(true);
    // Timeout to enable the button again. Prevents spamming
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, TIMEOUT);
  };

  const checkAnswer = () => {
    disableCheckAnswerButton();

    const userAnswer = selectedWords.join(" ");
    if (userAnswer !== correctSentence) {
      handleAnswerFeedback(false);
      setSelectedWords([]);
      dontGoToNextSentence();
      return;
    } else if (userAnswer === correctSentence) {
      handleAnswerFeedback(true);
      // Timeout to show the feedback animation
      setTimeout(() => {
        try {
          if (index < content.length - 1) {
            goToNextSentence();
            setSelectedWords([]);
          } else {
            setIsFinished(true);
            passIsFinished(true);
            setLessonCompletion(
              data[lessonIndex].lessons[grammarIndex].title_en
            );
          }
        } catch (error) {
          console.error("Error when updating lesson completion:", error);
        }
      }, TIMEOUT);
    } else {
      return;
    }
  };

  const setLessonCompletion = async (title_en) => {
    try {
      const data = {
        title_en: title_en,
      };
      GrammarService.updateLessonCompletion(data)
        .then((res) => {
          if (res.status === 403) {
            console.error("Guest status:", res.status);
            navigate("/landing");
          }
          console.log("Lektion erfolgreich abgeschlossen:", res);
        })
        .catch((error) => {
          console.error("Fehler beim Abschließen der Lektion:", error);
        });
    } catch (error) {
      console.error("Error when setting completed to true:", error);
    }
  };
  const Completion = () => (
    <div className={`g-box text-center `}>
      <h1>{t("completion.title")}</h1>
      <div className="d-flex flex-column align-items-center bg-light p-3 rounded text-dark ">
        <p>{t("completion.message")}</p>
        <img className="g-img-finished m-2" src={happyPingu}></img>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/grammar")}>
          {t("completion.button")}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {isFinished ? (
        <Completion />
      ) : (
        <div className={`g-box `}>
          <h1>{title}</h1>

          {sentence && visibleWords && (
            <div
              className={`bg-light p-3 rounded text-dark position-relative 
              ${isWrong ? "wrong" : ""} 
              ${isRight ? "right" : ""}`}>
              <div>
                <p>
                  <big>{sentence[nativeLanguage]}</big>
                </p>
                <p>
                  <small>{t("translationSentence")}</small>
                </p>
                <div>
                  <div>
                    <span
                      className={`placeholder ${
                        selectedWords.length > 0 ? "hidden" : ""
                      }`}></span>
                    {selectedWords.map((word, index) => (
                      <button
                        className="btn-selected-word"
                        key={index}
                        onClick={() => handleSelectedWordClick(word)}>
                        {word}
                      </button>
                    ))}

                    {isWrong && <img src={sadPingu} className="g-lesson-img" />}
                    {isRight && (
                      <img src={happyPingu} className="g-lesson-img" />
                    )}

                    <hr />
                  </div>
                </div>
                <p>
                  {visibleWords.map((word, index) => (
                    <button
                      className="btn-select-word"
                      key={index}
                      onClick={() => handleWordClick(word)}>
                      {word}
                    </button>
                  ))}
                </p>
              </div>
              <button
                className="btn btn-primary"
                onClick={checkAnswer}
                disabled={isButtonDisabled}>
                Check
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default GrammarCard;
