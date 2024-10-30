const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VocabularyCollectionSchema = new Schema({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  isPublic: { type: Boolean, required: true },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vocabulary",
      required: true,
    },
  ],
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

module.exports = mongoose.model(
  "VocabularyCollection",
  VocabularyCollectionSchema
);
