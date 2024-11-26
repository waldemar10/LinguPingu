import axiosWithAuth from "../config/axiosWithAuth";
import apiEndoints from "../config/apiEndpoints";

class UserService{
    getUser(){
        return axiosWithAuth.get(apiEndoints.getUserData);
    }
    updateBiography(data){
        return axiosWithAuth.post(apiEndoints.updateBiography, {data});
    }
    updateUser(data){
        return axiosWithAuth.post(apiEndoints.updateUser, {data});
    }

}

export default new UserService();