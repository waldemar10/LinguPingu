import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
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

function GrammarHub() {
  const [t, i18next] = useTranslation();
  const { selectedTab, setSelectedTab } = useSelectedTab();
  const { targetLanguage, setLanguages } = useLanguage();
  const { loadedData, setLoadedData } = useData();
  const [data, setData] = useState();
  const [completedLessons, setCompletedLessons] = useState([]);
  const nativeLanguage = i18next.language;

  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData ? userData._id : null;

  useEffect(() => {
    const userLearningLanguage = userData
      ? userData.learningLanguages[0]
      : "en";
    let userNativeLanguage = "de";
    if (userData.selectedFlag !== undefined) {
      if (userData.selectedFlag === "gb") {
        userNativeLanguage = "en";
        /* console.log(userData.selectedFlag) */
      } else {
        userNativeLanguage = userData ? userData.selectedFlag : "de";
        /* console.log(userData.selectedFlag) */
      }
    } else {
      userNativeLanguage = userData ? userData.nativeLanguage[0] : "de";
    }
    setLanguages(userLearningLanguage, userNativeLanguage);

    const arr = [
      {
        targetLanguage: userLearningLanguage,
        nativeLanguage: userNativeLanguage,
      },
    ];

    if (arr !== null && arr !== undefined) {
      localStorage.setItem("language", JSON.stringify(arr));
      fetchData();
    }
  }, [setLanguages, nativeLanguage, targetLanguage]);

  useEffect(() => {
    if (loadedData !== null && loadedData !== undefined) {
      const fetchCompletedLessons = async () => {
        const completedLessonsData = [];

        for (const lesson of loadedData) {
          for (const grammar of lesson.lessons) {
            const isCompleted = await checkCompletion(userId, grammar._id);
            // * Check if the lesson is completed
            if (isCompleted) {
              // * Add the lesson to the completedLessons array
              completedLessonsData.push(grammar[titleKey]);
            }
          }
        }

        setCompletedLessons(completedLessonsData);
      };

      fetchCompletedLessons();
    }
  }, [userId, loadedData]);

  // * Fetch gramamr data from the server
  const fetchData = async (retryCount = 3) => {
    try {
      const response = await fetch("http://localhost:5000/getGrammarData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result === null && retryCount > 0) {
        await fetchData(retryCount - 1);
      } else {
        setData(result);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      const dbData = await handleIndexedDB();
      if (dbData !== undefined && dbData !== null) {
        setData(dbData);
      }
    }
  };

  const handleIndexedDB = async () => {
    try {
      const db = await openDatabase();
      const existingData = await getObjectFromStore(db, "myObjectStore", 1);
      return existingData.data;
    } catch (error) {
      console.error("IndexedDB-Fehler:", error);
    }
  };
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
  // * Set the loaded data
  useEffect(() => {
    try {
      if (data !== undefined && data !== null) {
        initializeDatabase(1, data);
        if (selectedTab === "timePhrase") {
          setLoadedData(data.TimePhrases);
        } else if (selectedTab === "everydayLife") {
          setLoadedData(data.EverydayLife);
        } else {
          setLoadedData(data.TimePhrases);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [data, selectedTab]);

  const headers = {
    de: {
      timePhrase: "Die Zeitangaben",
      everydayLife: "Der Alltag",
    },
    en: {
      timePhrase: "The time phrases",
      everydayLife: "The everyday life",
    },
  };
  const title = {
    de: "title_de",
    en: "title_en",
  };
  const subtitle = {
    de: "subtitle_de",
    en: "subtitle_en",
  };
  const completed = {
    de: "Abgeschlossen",
    en: "Completed",
  };
  const grammarTitle = {
    de: "Grammatik",
    en: "Grammar",
  };

  const titleKey = title[nativeLanguage] || "title_en";
  const subtitleKey = subtitle[nativeLanguage] || "subtitle_en";
  const grammarTitleKey = grammarTitle[nativeLanguage] || "Grammar";

  let headersTimePhraseKey = "The time phrases";
  if (headers[nativeLanguage] !== undefined) {
    headersTimePhraseKey =
      headers[nativeLanguage]["timePhrase"] || "The time phrases";
  }

  let headersEverydayLifeKey = "The everyday life";
  if (headers[nativeLanguage] !== undefined) {
    headersEverydayLifeKey =
      headers[nativeLanguage]["everydayLife"] || "The everyday life";
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

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  // * Check if the lesson is completed.
  const checkCompletion = async (userId, lessonId) => {
    try {
      const db = await openDatabase();
      const existingData = await getObjectFromStore(
        db,
        "myObjectStore",
        lessonId
      );

      if (existingData !== undefined && existingData !== null) {
        return true;
      } else {
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

          if (
            lessonProgressData &&
            lessonProgressData.completed !== undefined
          ) {
            /* initializeDatabase(lessonProgressData.lessonId,lessonProgressData.completed) */

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
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

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
    <div className="d-flex flex-column justify-content-center align-items-center">
      <NavigationBar className="mb-5" />

      <div className="g-box">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-3 mt-5 display-4 user-select-none">
            {grammarTitleKey}
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
              {headersTimePhraseKey}
            </a>
          </li>
          <li className="nav-item g-hover">
            <a
              className={`nav-link ${
                selectedTab === "everydayLife" ? "active" : ""
              }`}
              onClick={() => handleTabChange("everydayLife")}
            >
              {headersEverydayLifeKey}
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
            completedLessons.includes(grammar[titleKey])
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

                      {completedLessons.includes(grammar[titleKey]) && (
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
