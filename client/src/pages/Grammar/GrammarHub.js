import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { useData, useSelectedTab } from "../../context/DataContext";
import NavigationBar from "../../components/NavigationBar";

import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  openDatabase,
  addObjectToStore,
  getObjectFromStore,
  updateObjectInStore,
} from "../../utils/indexedDB";
import "../../styles/Grammar.css";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/UserContext";
function GrammarHub() {
  const [t] = useTranslation("grammarHub");
  const { selectedTab, setSelectedTab } = useSelectedTab();
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingGrammarData, setLoadingGrammarData] = useState(true);
  const { loadedData, setLoadedData } = useData();
  const [data, setData] = useState();
  const [completedLessons, setCompletedLessons] = useState([]);
  const { id, setId } = useContext(UserContext);
  const {appLanguage, setAppLanguage} = useContext(LanguageContext);

  const navigate = useNavigate();

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

      setAppLanguage(data.appLanguages);

    } catch (error) {
      console.error("Fetch error:", error);
    } finally{
      setLoadingUser(false);
    }
  };
  
  useEffect(()=>{
    if(!localStorage.getItem(`${id}_appLanguage`)){
      fetchUserData();
    }else{
      setAppLanguage(localStorage.getItem(`${id}_appLanguage`));
    }
  },[])

  const initializeDatabase = async (key, data) => {
    try {
      const db = await openDatabase();

      const objectId = key;
      const existingData = await getObjectFromStore(db, "myObjectStore", key);
      // * Check if the data is already in the store
      if (existingData) {
        // Update data in store
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
  const handleIndexedDB = async () => {
    try {
      const db = await openDatabase();
      const existingData = await getObjectFromStore(db, "myObjectStore", 1);
      if (!existingData) {
        return null;
      }
      return existingData.data;
    } catch (error) {
      console.error("IndexedDB-Fehler:", error);
    }
  };
// * Fetch gramamr data from the server
const fetchData = async (retryCount = 3) => {
  try {
    const dbData = await handleIndexedDB();
    if(dbData){
      setData(dbData);
      setLoadingGrammarData(false);
      return;
    }else{
    setLoadingGrammarData(true);
    const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/getGrammarData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (result === null && retryCount > 0) {
      await fetchData(retryCount - 1);
    } else {

      initializeDatabase(1, result);
      setData(result);
      setLoadingGrammarData(false);
    }
  }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
// * Set the loaded data
useEffect(() => {
  try {
    if(data){
    switch(selectedTab){
      case "timePhrase":
        setLoadedData(data.TimePhrases);
        break;
      case "everydayLife":
        setLoadedData(data.EverydayLife);
        break;
      default:
        setLoadedData(data.TimePhrases);
        break;
    }
  }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}, [selectedTab,data]);

const getCompletedLessons = async () => {
  try {
    if(localStorage.getItem(`${id}_completedLessons`)){
      setCompletedLessons(localStorage.getItem(`${id}_completedLessons`));
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
      if(lessonProgressData){
        setCompletedLessons(lessonProgressData);
        localStorage.setItem(`${id}_completedLessons`, JSON.stringify(lessonProgressData));
      }
    } else {
      console.error("Error fetching data:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  useEffect(() => {
    fetchData();
    getCompletedLessons();
  }, []);

  

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  const title = {
    de: "title_de",
    en: "title_en",
  };
  const subtitle = {
    de: "subtitle_de",
    en: "subtitle_en",
  };

  const titleKey = title[appLanguage] || "title_en";
  const subtitleKey = subtitle[appLanguage] || "subtitle_en";

  if (loadingGrammarData) {
    return (
      <div className=" vh-100 d-flex flex-column align-items-center justify-content-center">
        <div
          className="spinner-border text-primary "
          style={{ width: "6rem", height: "6rem" }}
        ></div>
        {loadingGrammarData && <p className="text-light">Loading Grammar...</p>}
      </div>
    );
  }

  // * Open the grammar card
  const openGrammarCard = (lessonIndex, grammarIndex, grammarTitle) => {
    // Check if the required data is available
    if (
      loadedData &&
      loadedData.length > lessonIndex &&
      loadedData[lessonIndex].lessons &&
      loadedData[lessonIndex].lessons.length > grammarIndex
    ) {
      const selectedData = loadedData[lessonIndex].lessons[grammarIndex];
      if (selectedData && selectedData[titleKey] === grammarTitle) {
        // * Navigate to lessons.js Page with the selected grammar. The grammarcard will be displayed there.
        navigate(`/grammar/${lessonIndex}/${grammarIndex}/`);
      } else {
        console.error(`Selected grammar not found for title: ${grammarTitle}`);
      }
    } else {
      console.error(
        `Invalid lessonIndex: ${lessonIndex} or grammarIndex: ${grammarIndex}`
      );
    }
  };

  

  if (loadedData === null || loadedData === undefined || loadingUser) {
    return (
      <div className=" vh-100 d-flex align-items-center justify-content-center">
        <div
          className="spinner-border text-primary "
          style={{ width: "6rem", height: "6rem" }}
        ></div>
        {loadingUser && <p className="text-light">Loading User...</p>}
        {loadedData === undefined && <p className="text-light">Loading Data...</p>}
      </div>
    );
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <NavigationBar className="mb-5" />

      <div className="g-box">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-3 mt-5 display-4 user-select-none">
            {t("grammarTitle")}
          </h1>
        </div>
        <ul className="nav nav-pills">
          <li className="nav-item g-hover">
            <a
              className={`nav-link ${
                selectedTab === "timePhrase" || selectedTab === undefined
                  ? "active"
                  : ""
              }`}
              onClick={() => handleTabChange("timePhrase")}
            >
              {t("headers.timePhrase")}
            </a>
          </li>
          <li className="nav-item g-hover">
            <a
              className={`nav-link ${
                selectedTab === "everydayLife" ? "active" : ""
              }`}
              onClick={() => handleTabChange("everydayLife")}
            >
              {t("headers.everydayLife")}
            </a>
          </li>
        </ul>

        {loadedData.map((lesson, lessonIndex) => (
          <div key={lesson.level} className="rounded p-1">
            <div
              key={lesson.level + `${lessonIndex + "G-Div"}`}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              {lesson.lessons.map((grammar, grammarIndex) => (
                <button
                  key={grammar[titleKey]}
                  className={`d-flex justify-content-center align-items-center btn  bg-g-button m-2 w-100 position-relative
          ${
            completedLessons.includes(grammar.title_en)
              ? "btn-completed"
              : "btn-hover"
          }
          `}
                  style={{ minHeight: "125px" }}
                  onClick={() => {
                    openGrammarCard(
                      lessonIndex,
                      grammarIndex,
                      grammar[titleKey]
                    );
                  }}
                >
                  <img
                    src={process.env.PUBLIC_URL + grammar.img}
                    className="g-img m-2 rounded-circle"
                    alt={grammar[titleKey]}
                  />

                  <div className="w-100 p-2 text-start text-light ">
                    <div className="row justify-content-between align-items-center">
                      <h4 className="col">{grammar[titleKey]}</h4>

                      {completedLessons.includes(grammar.title_en) && (
                        <div className="completed col  g-completed-box">
                          <FontAwesomeIcon icon={faCircleCheck} size="2x" />
                        </div>
                      )}
                    </div>
                    <p>
                      <small>{grammar[subtitleKey]} </small>
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GrammarHub;
