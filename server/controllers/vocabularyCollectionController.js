const { ObjectId } = require("mongodb");
const VocabularyCollection = require("../model/VocabularyCollection");
const getUserId = require("../common/verification");

async function getAll(req, res) {
  try {
    const collectionData = await VocabularyCollection.find({
      $or: [
        { owner: getUserId(req) },
        { owner: "PinguLingu" },
        { isPublic: true },
      ],
    })
      .populate("cards")
      .populate("tags");

    res.json({ collectionData });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getFilteredCollection(req, res) {
  try {
    const filterData = req.query.data;
    let collectionData = [];

    if (filterData === "all") {
      collectionData = await VocabularyCollection.find({
        $or: [
          { owner: getUserId(req) },
          { owner: "PinguLingu" },
          { isPublic: true },
        ],
      })
        .populate("cards")
        .populate("tags");
    } else if (filterData === "your") {
      collectionData = await VocabularyCollection.find({
        owner: getUserId(req),
      })
        .populate("cards")
        .populate("tags");
    } else if (filterData === "pinguLingu") {
      collectionData = await VocabularyCollection.find({ owner: "PinguLingu" })
        .populate("cards")
        .populate("tags");
    } else if (filterData === "otherUser") {
      collectionData = await VocabularyCollection.find({
        $and: [
          { owner: { $ne: getUserId(req) } },
          { owner: { $ne: "PinguLingu" } },
          { isPublic: true },
        ],
      })
        .populate("cards")
        .populate("tags");
    }

    res.json({ collectionData: collectionData });
  } catch (error) {
    console.error("Error getting filtered cards", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createCollection(req, res) {
  try {
    const { name, isPublic, cards, tags } = req.body.data;

    const newCollection = new VocabularyCollection({
      owner: getUserId(req),
      name,
      isPublic,
      cards,
      tags,
    });

    await newCollection.save();

    res
      .status(201)
      .json({ success: true, message: "Collection succssfully created" });
  } catch (error) {
    console.error("Error creating vocabulary collection:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function deleteCollection(req, res) {
  try {
    const id = req.body.data;
    const objId = new ObjectId(id);
    const result = await VocabularyCollection.deleteOne({ _id: objId });

    if (result.deletedCount === 1) {
      res
        .status(200)
        .json({ success: true, message: "Collection successfully deleted" });
    } else {
      res.status(404).json({ success: false, error: "Collection not found" });
    }
  } catch (error) {
    console.error("Error deleting vocabulary collection:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function updateCollection(req, res) {
  try {
    const { id, data } = req.body;
    const objId = new ObjectId(id);
    const result = await VocabularyCollection.updateOne(
      { _id: objId },
      { $set: data }
    );

    if (result.matchedCount === 1 && result.modifiedCount === 1) {
      res
        .status(200)
        .json({ success: true, message: "Collection successfully updated" });
    } else {
      if (result.modifiedCount === 0)
        res.status(405).json({
          success: false,
          error: "There are no changes in this collection",
        });
      else
        res.status(404).json({ success: false, error: "Collection not found" });
    }
  } catch (error) {
    console.error("Error deleting vocabulary collection:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = {
  getAll,
  getFilteredCollection,
  createCollection,
  deleteCollection,
  updateCollection,
};
