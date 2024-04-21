import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GrammarCard from "../../components/GrammarCard";
import GreetingsContent from "../../components/GrammarLessons/EverdayLife/GreetingsContent";
import Introduction from "../../components/GrammarLessons/EverdayLife/Introduction";
import RestaurantOrder from "../../components/GrammarLessons/EverdayLife/RestaurantOrder";
import SimplePresent from "../../components/GrammarLessons/TimePhrases/SimplePresent";
import SimplePast from "../../components/GrammarLessons/TimePhrases/SimplePast";
import PresentPerfect from "../../components/GrammarLessons/TimePhrases/PresentPerfect";
import { useLanguage } from "../../context/LanguageContext";
import { useData, useSelectedTab } from "../../context/DataContext";
import { useTranslation } from "react-i18next";

import NavigationBar from "../../components/NavigationBar";

import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Grammar.css";

function Lessons() {
  const { lessonIndex, grammarIndex } = useParams();
  const [onIsFinished, setOnIsFinished] = useState(false);
  const [selectedGrammar, setSelectedGrammar] = useState();
  const [showGrammarCard, setShowGrammarCard] = useState(false);
  const { targetLanguage, setLanguages } = useLanguage();
  const { loadedData, setLoadedData } = useData();
  const [isCompleted, setIsCompleted] = useState(false);
  const [t, i18next] = useTranslation();
  const navigate = useNavigate();
  const nativeLanguage = i18next.language;

  useEffect(() => {
    if (loadedData !== null && loadedData !== undefined) {
      if (
        loadedData[lessonIndex].level &&
        loadedData[lessonIndex].lessons[grammarIndex].title_de
      ) {
        const selectedGrammar = loadedData[lessonIndex].lessons[grammarIndex];
        setSelectedGrammar(selectedGrammar);
        checkCompletion(
          userId,
          loadedData[lessonIndex].lessons[grammarIndex]._id
        ).then((completed) => {
          setIsCompleted(completed);
        });
      }
    }
  }, [lessonIndex, grammarIndex, loadedData]);

  useEffect(() => {
    const userLearningLanguage = userData
      ? userData.learningLanguages[0]
      : "en";
    let userNativeLanguage = "de";
    if (userData.selectedFlag !== undefined) {
      if (userData.selectedFlag === "gb") {
        userNativeLanguage = "en";
      } else {
        userNativeLanguage = userData ? userData.selectedFlag : "de";
      }
    } else {
      userNativeLanguage = userData ? userData.nativeLanguage[0] : "de";
    }

    setLanguages(userLearningLanguage, userNativeLanguage);
  }, [setLanguages, nativeLanguage, targetLanguage]);

  const title = {
    de: "title_de",
    en: "title_en",
  };
  const completed = {
    de: "Abgeschlossen",
    en: "Completed",
  };
  const lessonRepeat = {
    de: "Übung wiederholen",
    en: "Repeat Lesson",
  };
  const lessonStart = {
    de: "Übung starten",
    en: "Start Lesson",
  };
  const back = {
    de: "Zurück",
    en: "Back",
  };
  const backToExplanation = {
    de: "Zurück zur Erklärung",
    en: "Back to Explanation",
  };

  const titleKey = title[i18next.language] || "title_en";
  const lessonRepeatKey = lessonRepeat[i18next.language] || "Repeat Lesson";
  const lessonStartKey = lessonStart[i18next.language] || "Start Lesson";
  const backKey = back[i18next.language] || "Back";
  const backToExplanationKey =
    backToExplanation[i18next.language] || "Back to Explanation";

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData ? userData._id : null;

  const checkCompletion = async (userId, lessonId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/lessonProgress/${userId}/${lessonId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 404) {
        console.error("Resource not found:", response.status);
        return false;
      }

      if (response.ok) {
        const lessonProgressData = await response.json();

        if (lessonProgressData && lessonProgressData.completed !== undefined) {
          if (lessonProgressData.completed === true) {
            return true;
          } else {
            return false;
          }
        } else {
          console.error("Empty Lessons");
          return false;
        }
      } else {
        console.error("Error fetching data:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };
  const onClickGrammarCard = () => {
    setShowGrammarCard(!showGrammarCard);
  };

  const onClickBackGrammarHub = () => {
    navigate(`/grammar/`);
  };
  // If languages are not set, get them from local storage
  if (
    nativeLanguage === undefined ||
    nativeLanguage === null ||
    targetLanguage === undefined ||
    targetLanguage === null
  ) {
    const storedData = JSON.parse(localStorage.getItem("language"));
    setLanguages(storedData[0].targetLanguage, storedData[0].nativeLanguage);
  }
  useEffect(() => {
    if (loadedData === null || loadedData === undefined) {
      const timeoutId = setTimeout(() => {
        navigate(`/grammar/`);
      }, 2500);

      return () => clearTimeout(timeoutId);
    }
  }, [loadedData]);
  // If the data is not loaded yet, display a spinner
  if (loadedData === null || loadedData === undefined) {
    return (
      <div className=" vh-100 d-flex align-items-center justify-content-center">
        <div
          className="spinner-border text-primary "
          style={{ width: "6rem", height: "6rem" }}
        ></div>
      </div>
    );
  }

  return (
    <>
      <NavigationBar className="mb-5" />
      {selectedGrammar && !showGrammarCard && (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <div className="bg-light text-dark rounded p-4 w-responsive">
            <div className="row align-items-end justify-content-between w-100">
              <h2 className="mb-3 col display-6">
                {selectedGrammar[titleKey]}
              </h2>
              {isCompleted && (
                <div className="completed col g-completed-box text-success p-3 ">
                  <FontAwesomeIcon icon={faCircleCheck} size="3x" />
                </div>
              )}
            </div>
            <GreetingsContent
              nativeLanguage={nativeLanguage}
              targetLanguage={targetLanguage}
              isLesson={selectedGrammar.title_de === "Grundlegende Begrüßungen"}
            />
            <Introduction
              nativeLanguage={nativeLanguage}
              targetLanguage={targetLanguage}
              isLesson={selectedGrammar.title_de === "Vorstellung"}
            />
            <RestaurantOrder
              nativeLanguage={nativeLanguage}
              targetLanguage={targetLanguage}
              isLesson={selectedGrammar.title_de === "Bestellen im Restaurant"}
            />
            <SimplePresent
              nativeLanguage={nativeLanguage}
              targetLanguage={targetLanguage}
              isLesson={selectedGrammar.title_de === "Simple Present"}
            />
            <SimplePast
              nativeLanguage={nativeLanguage}
              targetLanguage={targetLanguage}
              isLesson={selectedGrammar.title_de === "Simple Past"}
            />
            <PresentPerfect
              nativeLanguage={nativeLanguage}
              targetLanguage={targetLanguage}
              isLesson={selectedGrammar.title_de === "Present Perfect"}
            />
            <div className="d-flex flex-row align-items-center justify-content-between">
              {isCompleted && (
                <button
                  className="btn btn-primary m-1"
                  onClick={onClickGrammarCard}
                >
                  {lessonRepeatKey}
                </button>
              )}
              {!isCompleted && (
                <button
                  className="btn btn-primary m-1 btn-lg"
                  onClick={onClickGrammarCard}
                >
                  {lessonStartKey}
                </button>
              )}

              <button
                className="btn btn-secondary"
                onClick={onClickBackGrammarHub}
              >
                {backKey}
              </button>
            </div>
          </div>
        </div>
      )}
      {showGrammarCard && (
        <div className="d-flex flex-column justify-content-center align-items-center m-5">
          {selectedGrammar && (
            <GrammarCard
              title={selectedGrammar[titleKey]}
              content={selectedGrammar.content}
              data={loadedData}
              targetLanguage={targetLanguage}
              passIsFinished={setOnIsFinished}
            />
          )}
          {!onIsFinished && (
            <button
              className="btn btn-secondary mt-5"
              onClick={onClickGrammarCard}
            >
              {backToExplanationKey}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Lessons;
