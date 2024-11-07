import { useMemo, useState, useEffect,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import happyPingu from "../images/PinguIcons/happyPingu.png";
import sadPingu from "../images/PinguIcons/sadPingu.png";
import "../styles/Grammar.css";
import { useTranslation } from "react-i18next";
const GERMAN = "de";
const ENGLISH = "en";
// Shuffle array function
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// Shuffle word array function
const shuffleWordArray = (array, dataArray, errorWords) => {
  const shuffledArray = [...array, ...errorWords];
  const dataSentence = dataArray.replace(/,/g, " ,");

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];

    const shuffledSentence = shuffledArray.join(" ");

    // Check if the shuffled sentence is the same as the data sentence
    if (shuffledSentence === dataSentence) {
      // If it is the same, shuffle again
      return shuffleWordArray(array, dataArray, errorWords);
    }
  }

  return shuffledArray;
};

// Function for creating error word array
const createErrorWordArray = (errorWords, targetLanguage) => {
  const shuffledArray = [...errorWords];

  switch (targetLanguage) {
    case GERMAN:
      return shuffledArray[0]?.err_de?.split(";") ?? [];
    case ENGLISH:
      return shuffledArray[0]?.err_en?.split(";") ?? [];
    default:
      return [];
  }
};

var counterForClickedWords = 0;

function GrammarCard({ title, content, data, passIsFinished }) {
  const [t] = useTranslation("grammarHub");
  const { lessonIndex, grammarIndex } = useParams();
  const [randomItem, setRandomItem] = useState(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const [visibleWords, setVisibleWords] = useState([]);
  const [isWrong, setIsWrong] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { id, setId } = useContext(UserContext);
  const navigate = useNavigate();

  let languageKey = "en"; // Default language key
  let nativeLanguageKey = "en"; // Default native language key
  if (localStorage.getItem(`${id}_learningLanguages`) !== null) {
    languageKey = localStorage.getItem(`${id}_learningLanguages`);
    if (languageKey === "gb") {
      languageKey = "en";
    }
  }
  if (localStorage.getItem(`${id}_nativeLanguage`) !== null) {
    nativeLanguageKey = localStorage.getItem(`${id}_nativeLanguage`);
  }

  const shuffleContent = useMemo(() => shuffleArray(content), [content]);


  const updateVisibleWords = () => {
    if (shuffleContent.length > 0) {
      setRandomItem(shuffleContent[0]);

      const errorWordArray = createErrorWordArray(shuffleContent, languageKey);
      const initialVisibleWords = shuffleContent[0][languageKey]
        .replace(/,/g, " ,")
        .split(" ");
      setVisibleWords(
        shuffleWordArray(
          initialVisibleWords,
          shuffleContent[0][languageKey],
          errorWordArray
        )
      );
    }
  };

  useEffect(() => {
    updateVisibleWords();
  }, [shuffleContent]);

  const handleWordClick = (word) => {
    const newVisibleWords = visibleWords.filter(
      (visibleWord) => visibleWord !== word
    );
    setVisibleWords(newVisibleWords);
    setSelectedWords([...selectedWords, word]);
    removeWordFromVisible(word);
    counterForClickedWords++;
  };

  const handleSelectedWordClick = (word) => {
    const newSelectedWords = selectedWords.filter(
      (selectedWord) => selectedWord !== word
    );
    setSelectedWords(newSelectedWords);
    setVisibleWords([...visibleWords, word]);
    counterForClickedWords--;
  };

  const handleAnswerFeedback = (isCorrect) => {
    isCorrect ? setIsRight(true) : setIsWrong(true);
    setTimeout(() => {
      setIsRight(false);
      setIsWrong(false);
    }, 1500);
  };

  const removeWordFromVisible = (word) => {
    const index = visibleWords.indexOf(word);
    if (index !== -1) {
      const newVisibleWords = [...visibleWords];
      newVisibleWords.splice(index, 1);
      setVisibleWords(newVisibleWords);
    }
  };

  // Check if the user answer is correct
  const checkAnswer = () => {
    // Disable the button to prevent spamming
    setIsButtonDisabled(true);
    const userAnswer = selectedWords.join(" ");

    // Check if the user answer is correct
    if (userAnswer === randomItem[languageKey].replace(/,/g, " ,")) {
      handleAnswerFeedback(true);
      // Set a timeout to show the next item
      setTimeout(() => {
        try {
          // Shuffle the content array
          shuffleContent.shift();
          setSelectedWords([]);
          const errorWordArray = createErrorWordArray(
            shuffleContent,
            languageKey
          );
          setRandomItem(shuffleContent[0]);
          const initialVisibleWords = shuffleContent[0][languageKey]
            .replace(/,/g, " ,")
            .split(" ");
          setVisibleWords(
            shuffleWordArray(
              initialVisibleWords,
              shuffleContent[0][languageKey],
              errorWordArray
            )
          );
        } catch (error) {
          setIsFinished(true);
          passIsFinished(true);
          let completedLessons =
            JSON.parse(localStorage.getItem(`${id}_completedLessons`)) || [];

          if (
            !completedLessons.includes(
              data[lessonIndex].lessons[grammarIndex].title_en
            )
          ) {
            completedLessons.push(
              data[lessonIndex].lessons[grammarIndex].title_en
            );
            localStorage.setItem(
              `${id}_completedLessons`,
              JSON.stringify(completedLessons)
            );
          }
          updateLessonCompletion(
            data[lessonIndex].lessons[grammarIndex].title_en
          );
        }
      }, 1500);
    } else {
      handleAnswerFeedback(false);
      setSelectedWords([]);
      const errorWordArray = createErrorWordArray(shuffleContent, languageKey);
      const initialVisibleWords = shuffleContent[0][languageKey]
        .replace(/,/g, " ,")
        .split(" ");
      setVisibleWords(
        shuffleWordArray(
          initialVisibleWords,
          shuffleContent[0][languageKey],
          errorWordArray
        )
      );
    }

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1500);
    counterForClickedWords = 0;
  };

  // Update the lesson completion
  const updateLessonCompletion = async (title_en) => {

    try {
      await fetch(
        `${process.env.REACT_APP_SERVER_URI}/updateLessonCompletion`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title_en: title_en,
          }),
          credentials: "include",
        }
      );
    } catch (error) {
      console.error("Error when setting completed to true:", error);
    }
  };
  return (
    <>
      <div className={`g-box ${isFinished ? "hidden" : ""}`}>
        <h1>{title}</h1>

        {randomItem && visibleWords && (
          <div
            className={`bg-light p-3 rounded text-dark position-relative ${
              isWrong ? "wrong" : ""
            } ${isRight ? "right" : ""}`}>
            <div>
              <p>
                <big>{randomItem[nativeLanguageKey]}</big>
              </p>
              <p>
                <small>{t("translationSentence")}</small>
              </p>
              <div>
                <div>
                  <span
                    className={`placeholder ${
                      counterForClickedWords > 0 ? "hidden" : ""
                    }`}></span>
                  {selectedWords.map((word, index) => (
                    <button
                      className="btn-selected-word"
                      key={index}
                      onClick={() => handleSelectedWordClick(word)}>
                      {word}
                    </button>
                  ))}

                  {isWrong && (
                    <img src={sadPingu} className="g-lesson-img"></img>
                  )}
                  {isRight && (
                    <img src={happyPingu} className="g-lesson-img"></img>
                  )}

                  <hr></hr>
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

      <div className={`g-box text-center ${isFinished ? "" : "hidden"}`}>
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
    </>
  );
}

export default GrammarCard;
