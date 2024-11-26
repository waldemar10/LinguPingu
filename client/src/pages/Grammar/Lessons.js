import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { DataContext } from "../../context/DataContext";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../components/LoadingSpinner";
import NavigationBar from "../../components/NavigationBar";
import GrammarService from "../../services/GrammarService";
import GrammarCard from "../../components/GrammarCard";
import AllLessons from "../../config/lessonsMapping";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Grammar.css";
function Lessons() {
  const { lessonIndex, grammarIndex } = useParams();
  const [onIsFinished, setOnIsFinished] = useState(false);
  const [selectedGrammar, setSelectedGrammar] = useState();
  const [showGrammarCard, setShowGrammarCard] = useState(false);
  const { appLanguage, learningLanguage } = useContext(LanguageContext);
  const { selectedGrammarLessonData } = useContext(DataContext);
  const [isCompleted, setIsCompleted] = useState(false);
  const [t] = useTranslation("grammarHub");
  const navigate = useNavigate();

  const onClickGrammarCard = () => {
    setShowGrammarCard(!showGrammarCard);
  };

  const onClickBackGrammarHub = () => {
    navigate(`/grammar/`);
  };

  const selectedLesson = () => {
    const Lesson = AllLessons[selectedGrammar.title_en];

    return Lesson ? (
      <Lesson
        nativeLanguage={appLanguage}
        targetLanguage={learningLanguage}
      />
    ) : null;
  };
  
  const getCompletedLessons = async () => {
    try {
      GrammarService.getLessonProgress().then((res) => {
        if (
          res.data.includes(
            selectedGrammarLessonData[lessonIndex].lessons[grammarIndex]
              .title_en
          )
        ) {
          setIsCompleted(true);
        } else {
          setIsCompleted(false);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // * If Data is not loaded, redirect to GrammarHub
    if (
      !selectedGrammarLessonData 
    ) {
      navigate(`/grammar/`);
      return;
    }
    // * If the lesson is already completed, set isCompleted to true
    getCompletedLessons();
    // * Set the selected Grammar
    setSelectedGrammar(
      selectedGrammarLessonData[lessonIndex].lessons[grammarIndex]
    );
  }, [selectedGrammarLessonData, lessonIndex, grammarIndex]);

  useEffect(() => {
    if (!selectedGrammar) return;
    selectedLesson();
  }, [selectedGrammar]);

  if (
    !selectedGrammarLessonData ||
    !selectedGrammar
  ) {
    return <LoadingSpinner />;
  }

  const title = selectedGrammar ? selectedGrammar["title_" + appLanguage] : "";

  return (
    <>
      <NavigationBar className="mb-5" />
      {selectedGrammar && !showGrammarCard && (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <div className="bg-light text-dark rounded p-4 w-responsive">
            <div className="row align-items-end justify-content-between w-100">
              <h2 className="mb-3 col display-6">{title}</h2>
              {isCompleted && (
                <div className="completed col g-completed-box text-success p-3 ">
                  <FontAwesomeIcon icon={faCircleCheck} size="3x" />
                </div>
              )}
            </div>

            {selectedLesson()}

            <div className="d-flex flex-row align-items-center justify-content-between">
              {isCompleted && (
                <button
                  className="btn btn-primary m-1"
                  onClick={onClickGrammarCard}>
                  {t("lessonRepeat")}
                </button>
              )}
              {!isCompleted && (
                <button
                  className="btn btn-primary m-1 btn-lg"
                  onClick={onClickGrammarCard}>
                  {t("lessonStart")}
                </button>
              )}

              <button
                className="btn btn-secondary"
                onClick={onClickBackGrammarHub}>
                {t("back")}
              </button>
            </div>
          </div>
        </div>
      )}
      {showGrammarCard && (
        <div className="d-flex flex-column justify-content-center align-items-center m-5">
          {selectedGrammar && (
            <GrammarCard
              title={title}
              content={selectedGrammar.content}
              data={selectedGrammarLessonData}
              targetLanguage={learningLanguage}
              passIsFinished={setOnIsFinished}
            />
          )}
          {!onIsFinished && (
            <button
              className="btn btn-secondary mt-5"
              onClick={onClickGrammarCard}>
              {t("backToExplanation")}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Lessons;
