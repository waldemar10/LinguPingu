import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GrammarCard from "../../components/GrammarCard";
import GreetingsContent from "../../components/GrammarLessons/EverdayLife/GreetingsContent";
import Introduction from "../../components/GrammarLessons/EverdayLife/Introduction";
import RestaurantOrder from "../../components/GrammarLessons/EverdayLife/RestaurantOrder";
import SimplePresent from "../../components/GrammarLessons/TimePhrases/SimplePresent";
import SimplePast from "../../components/GrammarLessons/TimePhrases/SimplePast";
import PresentPerfect from "../../components/GrammarLessons/TimePhrases/PresentPerfect";
import { LanguageContext } from "../../context/LanguageContext";
import { useData, useSelectedTab } from "../../context/DataContext";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/UserContext";

import NavigationBar from "../../components/NavigationBar";

import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Grammar.css";

function Lessons() {
  const { lessonIndex, grammarIndex } = useParams();
  const [onIsFinished, setOnIsFinished] = useState(false);
  const [selectedGrammar, setSelectedGrammar] = useState();
  const [showGrammarCard, setShowGrammarCard] = useState(false);
  const {appLanguage, learningLanguage,nativeLanguage,setAppLanguage, setLearningLanguage, setNativeLanguage } = useContext(LanguageContext);
  const [loadingUser, setLoadingUser] = useState(false);
  const { loadedData, setLoadedData } = useData();
  const [isCompleted, setIsCompleted] = useState(false);
  const { id, setId } = useContext(UserContext);
  const [t] = useTranslation("grammarHub");
  const navigate = useNavigate();
  const fetchProtectedData = async () => {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URI}/protected`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
      navigate("/landing");
    } 
  };
  const getCompletedLessons = async () => {
    try {
      if(localStorage.getItem(`${id}_completedLessons`).includes(loadedData[lessonIndex].lessons[grammarIndex].title_en)){
        setIsCompleted(true);
        return;
      }
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URI}/lessonProgress`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        }
      );
      
      if (response.status === 404) {
        console.error("Resource not found:", response.status);
        return;
      }
  
      if (response.ok) {
        const lessonProgressData = await response.json();
        if(lessonProgressData.includes(loadedData[lessonIndex].lessons[grammarIndex].title_en)){
          setIsCompleted(true);
          localStorage.setItem(`${id}_completedLessons`, JSON.stringify(lessonProgressData));
        }else{
          setIsCompleted(false);
        }
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchProtectedData();
    getCompletedLessons();
    setSelectedGrammar(loadedData[lessonIndex].lessons[grammarIndex]);
  }, []);

  const fetchUserData = async () => {
    setLoadingUser(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/user`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setLearningLanguage(data.learningLanguages);
      setNativeLanguage(data.nativeLanguage);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally{
      setLoadingUser(false);
    }
  }; 
  useEffect(()=>{
    
    if(localStorage.getItem(`${id}_learningLanguages`) !== null && learningLanguage === undefined){
      setLearningLanguage(localStorage.getItem(`${id}_learningLanguages`));
    }
    if(localStorage.getItem(`${id}_nativeLanguage`) !== null && nativeLanguage === undefined){
      setNativeLanguage(localStorage.getItem(`${id}_nativeLanguage`));
    }
    if(localStorage.getItem(`${id}_appLanguage`) !== null &&appLanguage === undefined){
      setAppLanguage(localStorage.getItem(`${id}_appLanguage`));
    }
    
    if(nativeLanguage === null || learningLanguage === null || appLanguage === null){
      fetchUserData();
    } 
  },[])

  const title = {
    de: "title_de",
    en: "title_en",
  };
  
  const titleKey = title[appLanguage] || "title_en";
  
  const onClickGrammarCard = () => {
    setShowGrammarCard(!showGrammarCard);
  };

  const onClickBackGrammarHub = () => {
    navigate(`/grammar/`);
  };

  useEffect(() => {
    if (loadedData === null || loadedData === undefined) {
      const timeoutId = setTimeout(() => {
        navigate(`/grammar/`);
      }, 2500);

      return () => clearTimeout(timeoutId);
    }
  }, [loadedData]);

  if (loadingUser) {
    return (
      <div className=" vh-100 d-flex align-items-center justify-content-center">
        <div
          className="spinner-border text-primary "
          style={{ width: "6rem", height: "6rem" }}
        ></div>
        {loadingUser && <p className="mt-3">Loading user data...</p>}
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
              nativeLanguage={appLanguage}
              targetLanguage={learningLanguage}
              isLesson={selectedGrammar.title_de === "Grundlegende Begrüßungen"}
            />
            <Introduction
              nativeLanguage={appLanguage}
              targetLanguage={learningLanguage}
              isLesson={selectedGrammar.title_de === "Vorstellung"}
            />
            <RestaurantOrder
              nativeLanguage={appLanguage}
              targetLanguage={learningLanguage}
              isLesson={selectedGrammar.title_de === "Bestellen im Restaurant"}
            />
            <SimplePresent
              nativeLanguage={appLanguage}
              targetLanguage={learningLanguage}
              isLesson={selectedGrammar.title_de === "Simple Present"}
            />
            <SimplePast
              nativeLanguage={appLanguage}
              targetLanguage={learningLanguage}
              isLesson={selectedGrammar.title_de === "Simple Past"}
            />
            <PresentPerfect
              nativeLanguage={appLanguage}
              targetLanguage={learningLanguage}
              isLesson={selectedGrammar.title_de === "Present Perfect"}
            />
            <div className="d-flex flex-row align-items-center justify-content-between">
              {isCompleted && (
                <button
                  className="btn btn-primary m-1"
                  onClick={onClickGrammarCard}
                >
                  {t("lessonRepeat")}
                </button>
              )}
              {!isCompleted && (
                <button
                  className="btn btn-primary m-1 btn-lg"
                  onClick={onClickGrammarCard}
                >
                  {t("lessonStart")}
                </button>
              )}

              <button
                className="btn btn-secondary"
                onClick={onClickBackGrammarHub}
              >
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
              title={selectedGrammar[titleKey]}
              content={selectedGrammar.content}
              data={loadedData}
              targetLanguage={learningLanguage}
              passIsFinished={setOnIsFinished}
            />
          )}
          {!onIsFinished && (
            <button
              className="btn btn-secondary mt-5"
              onClick={onClickGrammarCard}
            >
              {t("backToExplanation")}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Lessons;
