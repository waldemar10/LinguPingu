import { useState, useEffect } from "react";
import { shuffleArray, shuffleWordArray, createAnArrayWithErrorWords } from "../utils/grammarUtils";

const useShuffledWords = (content, languageKey) => {
  languageKey = "gb" ? "en" : languageKey;
  const [visibleWords, setVisibleWords] = useState([]);
  const [sentence, setSentence] = useState(null);
  const [index, setIndex] = useState(0);
  const [shuffledArray, setShuffledArray] = useState([]);
  useEffect(() => {
    if (content.length > 0) {
      const initialShuffeldArray = shuffleArray(content)
      setShuffledArray(initialShuffeldArray);
      setSentenceAndVisibleWords(0,initialShuffeldArray);
    }
  }, []);

  const setSentenceAndVisibleWords = (index,shuffledArray) => {
    if (shuffledArray.length > 0) {
      const initialSentence = shuffledArray[index];
      const errorWords = createAnArrayWithErrorWords(shuffledArray, languageKey);
      const shuffled = shuffleWordArray(
        initialSentence[languageKey].split(" "), 
        initialSentence[languageKey], 
        errorWords
      );
      setVisibleWords(shuffled);
      setSentence(initialSentence);
      console.log(initialSentence);
    }
  };
  const goToNextSentence = () => {
    console.log(index, shuffledArray
    )
    if (index < shuffledArray.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setSentenceAndVisibleWords(newIndex, shuffledArray, languageKey);
    }
  };
  const dontGoToNextSentence = () => {
    setSentenceAndVisibleWords(index, shuffledArray, languageKey);
  }
  return { visibleWords,setVisibleWords,index, sentence,goToNextSentence, dontGoToNextSentence};
};

export default useShuffledWords;