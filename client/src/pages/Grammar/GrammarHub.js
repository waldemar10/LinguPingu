import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import NavigationBar from "../../components/NavigationBar";
import NavigationTabs from "../../components/NavigationTabs";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import GrammarService from "../../services/GrammarService";
import { DataContext } from "../../context/DataContext";
import useGrammarData from "../../hooks/useGrammarData";
import useSelectedGrammarTab from "../../hooks/useSelectedGrammarTab";
import GrammarLessonCard from "../../components/GrammarLessonCard";

import "../../styles/Grammar.css";
function GrammarHub() {
  const [t] = useTranslation("grammarHub");
  const [selectedTab, setSelectedTab] = useState("timePhrase");
  const { grammarData, loadingGrammarData } = useGrammarData();
  const { selectedGrammarLessonData, setSelectedGrammarLessonData } =
    useContext(DataContext);
  const [completedLessons, setCompletedLessons] = useState([]);
  const { appLanguage } = useContext(LanguageContext);
  const tabs = ["timePhrase", "everydayLife"];
  const navigate = useNavigate();
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  useSelectedGrammarTab(grammarData, selectedTab, setSelectedGrammarLessonData);

  const getCompletedLessons = async () => {
    try {
      GrammarService.getLessonProgress()
        .then((res) => {
          setCompletedLessons(res.data);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCompletedLessons();
  }, []);

  // * Open the grammar card
  const openGrammarCard = (lessonIndex, grammarIndex, grammarTitle) => {
    // Check if the required data is available
    if (
      selectedGrammarLessonData === null ||
      selectedGrammarLessonData === undefined
    ) {
      return;
    }
    if (
      selectedGrammarLessonData.length > lessonIndex &&
      selectedGrammarLessonData[lessonIndex].lessons &&
      selectedGrammarLessonData[lessonIndex].lessons.length > grammarIndex
    ) {
      const selectedData =
        selectedGrammarLessonData[lessonIndex].lessons[grammarIndex];
      if (selectedData === null || selectedData === undefined) {
        return;
      }
      // * Check if the selected grammar is the same as the grammar title
      if (selectedData["title_" + appLanguage] === grammarTitle) {
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

  if (!selectedGrammarLessonData || loadingGrammarData || !grammarData) {
    return <LoadingSpinner />;
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
        <NavigationTabs
          tabs={tabs}
          selectedTab={selectedTab}
          handleTabChange={handleTabChange}
          t={t}
        />

        {selectedGrammarLessonData.map((lesson, lessonIndex) => (
          <GrammarLessonCard
            key={lesson.level + lesson + lessonIndex}
            lesson={lesson}
            lessonIndex={lessonIndex}
            appLanguage={appLanguage}
            openGrammarCard={openGrammarCard}
            completedLessons={completedLessons}
          />
        ))}
      </div>
    </div>
  );
}

export default GrammarHub;
