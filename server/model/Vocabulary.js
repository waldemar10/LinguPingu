const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vocabularySchema = new Schema({
  de: {
    type: String,
    required: true,
  },
  en: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});
module.exports = mongoose.model("Vocabulary", vocabularySchema);
