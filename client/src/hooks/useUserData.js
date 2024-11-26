
import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
const useUserData = (isEmpty) => {
    
    const {
      setAppLanguage,
      setLearningLanguage,
      setNativeLanguage,
    } = useContext(LanguageContext);
    const navigate = useNavigate();
    const [loadingUser, setLoadingUser] = useState(false);
const fetchUserData = async () => {
    if(!isEmpty) return;
    console.log("fetchUserData");
    setLoadingUser(true);    
    try {
      UserService.getUser()
        .then((res) => {
          const sessionItems = {
            username: res.data.username,
            biography: res.data.biography,
            profilePicture64: res.data.profilePicture64,
            profilePicture512: res.data.profilePicture512,
            country: res.data.country,
            verified: res.data.verified,
            learningLanguages:
              res.data.learningLanguages[0] === "gb"
                ? "en"
                : res.data.learningLanguages[0],
            nativeLanguage: res.data.nativeLanguage,
          };
          Object.entries(sessionItems).forEach(([key, value]) => {
            sessionStorage.setItem(key, value);
          });
          if (
            !localStorage.getItem("LinguPingu_appLanguage")
          ) {
            localStorage.setItem(
              "LinguPingu_appLanguage",
              res.data.nativeLanguage[0]
            );
          }
          setLearningLanguage(res.data.learningLanguages[0] === "gb" ? "en" : res.data.learningLanguages[0]);
          setNativeLanguage(res.data.nativeLanguage[0]);
          setAppLanguage(res.data.appLanguage);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigate("/landing");
          }
          console.error("Fetch error:", error);
        });
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
        setLoadingUser(false);
    }
  }
  useEffect(() => {
    fetchUserData();
    }, []);
    return {loadingUser};
};

export default useUserData;