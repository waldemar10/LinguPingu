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
// * Was needed to insert data into the database, while the database was local
// * Not needed anymore
async function insertGrammarData(jsonData) {
  try {
    const categoryData = jsonData[Object.keys(jsonData)[0]][0];
    const existingData = await Grammar.findOne({ category: categoryData.category, level: categoryData.level });

    if (existingData) {
      console.log(`Category (${categoryData.category}, ${categoryData.level}) already exists. Skipping insertion.`);
    } else {
      await Grammar.create(categoryData);
      console.log(`Category (${categoryData.category}, ${categoryData.level}) inserted successfully.`);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    /*  mongoose.disconnect(); */
  }
}

module.exports = { getGrammarData, insertGrammarData };