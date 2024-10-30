import axiosWithAuth from "../config/axiosWithAuth";
import apiEndoints from "../config/apiEndpoints";

class VocabularyService {
  getAll() {
    return axiosWithAuth.get(apiEndoints.getAllVocabulary);
  }

  getFilteredVocabulary(data) {
    return axiosWithAuth.get(apiEndoints.getFilteredVocabulary, {
      params: { data },
    });
  }

  createVocabularyCard(data) {
    return axiosWithAuth.post(apiEndoints.createVocabulary, { data });
  }

  deleteVocabulary(data) {
    return axiosWithAuth.post(apiEndoints.deleteVocabulary, { data });
  }

  updateVocabulary(id, updatedData) {
    return axiosWithAuth.post(apiEndoints.updateVocabulary, {
      id: id,
      data: updatedData,
    });
  }
}

export default new VocabularyService();
