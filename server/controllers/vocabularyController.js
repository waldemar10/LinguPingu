const { ObjectId } = require("mongodb");
const Vocabulary = require("../model/Vocabulary");
const getUserId = require("../common/verification");

async function getAll(req, res) {
  try {
    const vocabularyData = await Vocabulary.find({
      $or: [
        { owner: getUserId(req) },
        { owner: "PinguLingu" },
        { isPublic: true },
      ],
    }).populate("tags");

    res.json({ vocabularyData });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getFilteredVocabulary(req, res) {
  try {
    const filterData = req.query.data;
    let vocabularyData = [];

    if (filterData === "all") {
      vocabularyData = await Vocabulary.find({
        $or: [
          { owner: getUserId(req) },
          { owner: "PinguLingu" },
          { isPublic: true },
        ],
      }).populate("tags");
    } else if (filterData === "your") {
      vocabularyData = await Vocabulary.find({
        owner: getUserId(req),
      }).populate("tags");
    } else if (filterData === "pinguLingu") {
      vocabularyData = await Vocabulary.find({ owner: "PinguLingu" }).populate(
        "tags"
      );
    } else if (filterData === "otherUser") {
      vocabularyData = await Vocabulary.find({
        $and: [
          { owner: { $ne: getUserId(req) } },
          { owner: { $ne: "PinguLingu" } },
          { isPublic: true },
        ],
      }).populate("tags");
    }

    res.json({ vocabularyData });
  } catch (error) {
    console.error("Error getting filtered cards", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createVocabulary(req, res) {
  try {
    const { en, de, isPublic, tags } = req.body.data;

    const newCard = new Vocabulary({
      en,
      de,
      isPublic,
      owner: getUserId(req),
      tags,
    });

    await newCard.save();
    res
      .status(201)
      .json({ success: true, message: "Card succssfully created" });
  } catch (error) {
    console.error("Error creating vocabulary card:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function deleteVocabulary(req, res) {
  try {
    const id = req.body.data;
    const objId = new ObjectId(id);
    const result = await Vocabulary.deleteOne({ _id: objId });

    if (result.deletedCount === 1) {
      res
        .status(200)
        .json({ success: true, message: "Card successfully deleted" });
    } else {
      res.status(404).json({ success: false, error: "Card not found" });
    }
  } catch (error) {
    console.error("Error deleting vocabulary card:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function updateVocabulary(req, res) {
  try {
    const { id, data } = req.body;
    const objId = new ObjectId(id);
    const result = await Vocabulary.updateOne({ _id: objId }, { $set: data });

    if (result.matchedCount === 1 && result.modifiedCount === 1) {
      res
        .status(200)
        .json({ success: true, message: "Card successfully updated" });
    } else {
      if (result.modifiedCount === 0)
        res
          .status(405)
          .json({ success: false, error: "There are no changes in this card" });
      else res.status(404).json({ success: false, error: "Card not found" });
    }
  } catch (error) {
    console.error("Error deleting vocabulary card:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = {
  getAll,
  getFilteredVocabulary,
  createVocabulary,
  deleteVocabulary,
  updateVocabulary,
};
