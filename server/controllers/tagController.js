const { ObjectId } = require("mongodb");
// const Vocabulary = require("../model/Vocabulary");
const Tag = require("../model/Tag");

async function getAll(req, res) {
  try {
    const tagData = await Tag.find();

    if (!tagData || tagData.length === 0) {
      throw new Error("No vocabulary data found.");
    }

    res.json({ tagData });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createTag(req, res) {
  try {
    const tag = req.body.data;

    const existingTag = await Tag.findOne({
      value: tag.toLowerCase(),
    });

    if (existingTag) {
      return res
        .status(400)
        .json({ success: false, error: "Tag already exists" });
    }

    const newTag = new Tag({
      tag,
      value: tag.toLowerCase(),
    });

    await newTag.save();
    res.status(201).json({ success: true, message: "Tag succssfully created" });
  } catch (error) {
    console.error("Error creating Tag:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = {
  getAll,
  createTag,
};
