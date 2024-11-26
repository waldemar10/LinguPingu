import { useEffect } from "react";
const useSelectedGrammarTab = (grammarData,selectedTab,setSelectedGrammarLessonData) => {

    useEffect(() => {
        if(!grammarData) return;
        try {
            switch (selectedTab) {
              case "timePhrase":
                setSelectedGrammarLessonData(grammarData.TimePhrases);
                break;
              case "everydayLife":
                setSelectedGrammarLessonData(grammarData.EverydayLife);
                break;
              default:
                setSelectedGrammarLessonData(grammarData.TimePhrases);
                break;
            }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }, [grammarData, selectedTab, setSelectedGrammarLessonData]);

    }
    export default useSelectedGrammarTab;