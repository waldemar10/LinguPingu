import axiosWithAuth from "../config/axiosWithAuth";
import apiEndoints from "../config/apiEndpoints";

class GrammarService {
  getAll() {
    return axiosWithAuth.get(apiEndoints.getGrammarData);
  }

    getLessonProgress(data) {
        return axiosWithAuth.get(apiEndoints.getLessonProgress, {
            params: { data },
        });
    }

    updateLessonCompletion(data) {
        return axiosWithAuth.put(apiEndoints.updateLessonCompletion, { data });
    }

    removeLessonCompletion(data) {
        return axiosWithAuth.put(apiEndoints.removeLessonCompletion, { data });
    }
}

export default new GrammarService();