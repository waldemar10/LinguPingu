const apiEndoints = {};
const baseURL = process.env.REACT_APP_SERVER_URI;

apiEndoints.getUserData = baseURL + "/user";
apiEndoints.updateUser = baseURL + "/updateUser";
apiEndoints.getGrammarData = baseURL + "/getGrammarData";
apiEndoints.updateBiography = baseURL + "/biography";
apiEndoints.getLessonProgress = baseURL + "/lessonProgress";
apiEndoints.updateLessonCompletion = baseURL + "/updateLessonCompletion";
apiEndoints.removeLessonCompletion = baseURL + "/removeLessonCompletion";

apiEndoints.getAllVocabulary = baseURL + "/getAllVocabulary";
apiEndoints.getFilteredVocabulary = baseURL + "/getFilteredVocabulary";
apiEndoints.createVocabulary = baseURL + "/createVocabulary";
apiEndoints.deleteVocabulary = baseURL + "/deleteVocabulary";
apiEndoints.updateVocabulary = baseURL + "/updateVocabulary";

apiEndoints.getAllCollections = baseURL + "/getAllCollections";
apiEndoints.getFilteredCollection = baseURL + "/getFilteredCollections";
apiEndoints.createCollection = baseURL + "/createCollection";
apiEndoints.deleteCollection = baseURL + "/deleteCollection";
apiEndoints.updateCollection = baseURL + "/updateCollection";

apiEndoints.getAllTags = baseURL + "/getAllTags";
apiEndoints.createTag = baseURL + "/createTag";

module.exports = apiEndoints;
