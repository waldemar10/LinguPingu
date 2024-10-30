const mongoose = require('mongoose');
const { Schema } = mongoose;

const contentSchema = new Schema({
  en: String,
  err_en: String,
  de: String,
});

const lessonSchema = new Schema({
  title_en: String,
  subtitle_en: String,
  title_de: String,
  subtitle_de: String,
  img: String,
  content: [contentSchema],
});

const grammarSchema = new Schema({
  category: String,
  level: String,
  lessons: [lessonSchema],
});

const Grammar = mongoose.model('Grammar', grammarSchema);

module.exports = Grammar;