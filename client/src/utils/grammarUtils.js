// Shuffle array function
// * Randomize the order of elements in an array
const shuffleArray = (array) => {
    if(!array) return [];
    
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  // Shuffle word array function
  const shuffleWordArray = (words, fullSentence, errorWords) => {
    // Combine the array and error words
    const shuffledArray = [...words, ...errorWords];
    // Replace the commas in the sentence with a space and a comma
    const cleanSentence = fullSentence.replace(/,/g, " ,");
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  
      const shuffledSentence = shuffledArray.join(" ");
  
      // Check if the shuffled sentence is the same as the clean sentence
      if (shuffledSentence === cleanSentence) {
        // If it is the same, shuffle again
        return shuffleWordArray(words, fullSentence, errorWords);
      }
    }
    return shuffledArray;
  };
  
  // Function for creating error word array
  const createAnArrayWithErrorWords = (object, learningLanguage) => {
  
    switch (learningLanguage) {
      case "de":
        return object[0]?.err_de?.split(";") ?? [];
      case "en" ? "en" : "gb":
        return object[0]?.err_en?.split(";") ?? [];
      default:
        return [];
    }
  };

  export { shuffleArray, shuffleWordArray, createAnArrayWithErrorWords };