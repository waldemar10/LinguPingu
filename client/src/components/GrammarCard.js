import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  openDatabase,
  addObjectToStore,
  getObjectFromStore,
  updateObjectInStore,
} from "../utils/indexedDB";

import happyPingu from "../images/PinguIcons/happyPingu.png";
import sadPingu from "../images/PinguIcons/sadPingu.png";
import "../styles/Grammar.css";

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
  const { lessonIndex, grammarIndex } = useParams();
  const [randomItem, setRandomItem] = useState(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const [visibleWords, setVisibleWords] = useState([]);
  const [isWrong, setIsWrong] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { targetLanguage, nativeLanguage } = useLanguage();

  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));

  let languageKey = userData.learningLanguages[0];

  if (
    targetLanguage !== "en" &&
    targetLanguage !== "de" &&
    targetLanguage !== "gb"
  ) {
    languageKey = "en";
  }
  if(targetLanguage === "gb"){
    languageKey = "en";
  }
  let nativeLanguageKey = userData.nativeLanguage[0];

  if (
    nativeLanguage !== "en" &&
    nativeLanguage !== "de" &&
    nativeLanguage !== "gb"
  ) {
    nativeLanguageKey = "en";
  }
  if(nativeLanguage === "gb"){
    nativeLanguageKey = "en";
  }

  const shuffleContent = useMemo(() => shuffleArray(content), [content]);

  // Store completed lessons in indexedDB
  const initializeDatabase = async (key, data) => {
    try {
      const db = await openDatabase();

      const objectId = key;
      /*  await deleteObjectFromStore(db, 'myObjectStore', 2); */
      const existingData = await getObjectFromStore(db, "myObjectStore", key);
      // * Check if the data is already in the store
      if (existingData) {
        // Update data in store
        existingData.data = data;
        await updateObjectInStore(db, "myObjectStore", existingData);
      }
      // * If the data is not in the store
      else {
        // Add data to store
        await addObjectToStore(db, "myObjectStore", {
          id: objectId,
          data: data,
        });
      }
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  };

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
          // No more items in the array
          // Show the completion message
          setIsFinished(true);
          passIsFinished(true);
          initializeDatabase(data[lessonIndex].lessons[grammarIndex]._id, true);
          updateLessonCompletion();
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

  const getTranslationSentence = () => {
    const translationSentences = {
      de: "Übersetze den Satz: ",
      en: "Translate the sentence: ",
    };

    return translationSentences[nativeLanguageKey] || translationSentences.en;
  };
  const getCompletionMessage = () => {
    const completionMessages = {
      de: {
        title: "Gut gemacht!",
        message: "Du hast die Lektion abgeschlossen!",
        button: "Zurück zur Grammatik",
      },
      en: {
        title: "Well done!",
        message: "You have finished the lesson!",
        button: "Back to Grammar",
      },
    };

    return completionMessages[nativeLanguageKey] || completionMessages.en;
  };
  // Update the lesson completion
  const updateLessonCompletion = async () => {
    const lessonId = data[lessonIndex].lessons[grammarIndex]._id;
    const userId = userData._id;

    try {
      await fetch("http://localhost:5000/updateLessonCompletion", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          lessonId: lessonId,
        }),
      });
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
            } ${isRight ? "right" : ""}`}
          >
            <div>
              <p>
                <big>{randomItem[nativeLanguageKey]}</big>
              </p>
              <p>
                <small>{getTranslationSentence()}</small>
              </p>
              <div>
                <div>
                  <span
                    className={`placeholder ${
                      counterForClickedWords > 0 ? "hidden" : ""
                    }`}
                  ></span>
                  {selectedWords.map((word, index) => (
                    <button
                      className="btn-selected-word"
                      key={index}
                      onClick={() => handleSelectedWordClick(word)}
                    >
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
                    onClick={() => handleWordClick(word)}
                  >
                    {word}
                  </button>
                ))}
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={checkAnswer}
              disabled={isButtonDisabled}
            >
              Check
            </button>
          </div>
        )}
      </div>

      <div className={`g-box text-center ${isFinished ? "" : "hidden"}`}>
        <h1>{getCompletionMessage().title}</h1>
        <div className="d-flex flex-column align-items-center bg-light p-3 rounded text-dark ">
          <p>{getCompletionMessage().message}</p>
          <img className="g-img-finished m-2" src={happyPingu}></img>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/grammar")}
          >
            {getCompletionMessage().button}
          </button>
        </div>
      </div>
    </>
  );
}

export default GrammarCard;
