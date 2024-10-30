const FormValues = {};

FormValues.createCard = { de: "", en: "", isPublic: false, tags: [] };
FormValues.createCollection = {
  name: "",
  cards: [],
  isPublic: false,
  tags: [],
};
FormValues.createTag = { tag: "" };

module.exports = FormValues;
