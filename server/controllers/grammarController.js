const mongoose = require('mongoose');
const Grammar = require("../model/Grammar");

// * Get all grammar data
const getGrammarData = async (req, res) => {
  try {
    const everydayLifeData = await Grammar.find({ category: "Everyday Life", });
    const timePhrasesData = await Grammar.find({ category: "Time Phrases" });

    if (!everydayLifeData || !timePhrasesData) {
      throw new Error("Not all data could be retrieved.");
    }
    
    res.json({
      EverydayLife: everydayLifeData,
      TimePhrases: timePhrasesData,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getGrammarData };