import axiosWithAuth from "../config/axiosWithAuth";
import apiEndoints from "../config/apiEndpoints";

class VocabularyCollectionService {
  getAll() {
    return axiosWithAuth.get(apiEndoints.getAllCollections);
  }

  getFilteredCollection(data) {
    return axiosWithAuth.get(apiEndoints.getFilteredCollection, {
      params: { data },
    });
  }

  createCollection(data) {
    return axiosWithAuth.post(apiEndoints.createCollection, { data });
  }

  deleteCollection(data) {
    return axiosWithAuth.post(apiEndoints.deleteCollection, { data });
  }

  updateCollection(id, data) {
    return axiosWithAuth.post(apiEndoints.updateCollection, {
      id: id,
      data: data,
    });
  }
}

export default new VocabularyCollectionService();
