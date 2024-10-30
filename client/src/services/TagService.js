import axiosWithAuth from "../config/axiosWithAuth";
import apiEndoints from "../config/apiEndpoints";

class TagService {
  getAll() {
    return axiosWithAuth.get(apiEndoints.getAllTags);
  }

  createTag(data) {
    return axiosWithAuth.post(apiEndoints.createTag, { data });
  }

  /*
  deleteVocabulary(data) {
    return axiosWithAuth.post(apiEndoints.deleteVocabulary, { data });
  }

  updateVocabulary(id, updatedData) {
    return axiosWithAuth.post(apiEndoints.updateVocabulary, {
      id: id,
      data: updatedData,
    });
  }
  */
}

export default new TagService();
