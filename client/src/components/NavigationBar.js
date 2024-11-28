import React, { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Dropdown, Image } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/LanguageContext";
import Flag from "react-world-flags";
import useUserData from "../hooks/useUserData";
import LoadingSpinner from "./common/LoadingSpinner";
const NavigationBar = () => {
  // * The UserContext is used to access the user data.
  const {
    logout,
    username,
    setUsername,
    profilePicture64,
    setProfilePicture64,
    setProfilePicture512,
    setBiography,
  } = useContext(UserContext);
  const {
    setAppLanguage,
    setNativeLanguage,
    setLearningLanguage,
    appLanguage,
    nativeLanguage,
    learningLanguage,
  } = useContext(LanguageContext);

  const navbarNavRef = useRef(null);
  const [tp, i18next] = useTranslation("mainPages");
  const requiredKeys = ["username", "learningLanguages", "nativeLanguage"];

  const isSessionStorageEmpty = requiredKeys.some(
    (key) => !sessionStorage.getItem(key)
  );
  const isLocalStorageEmpty = !localStorage.getItem("LinguPingu_appLanguage");

  useUserData(isSessionStorageEmpty || isLocalStorageEmpty);

  const toggleLanguage = (appLanguage) => {
    if (!username) return;
    if (!appLanguage) return;

    if (appLanguage === nativeLanguage) {
      i18next.changeLanguage(learningLanguage);
    } else {
      i18next.changeLanguage(nativeLanguage);
    }
    setAppLanguage(i18next.language);
    localStorage.setItem("LinguPingu_appLanguage", i18next.language);
  };

  useEffect(() => {
    if (isLocalStorageEmpty && isSessionStorageEmpty) return;

    if (!isSessionStorageEmpty) {
      setUsername(sessionStorage.getItem("username"));
      setProfilePicture64(sessionStorage.getItem("profilePicture64"));
      setProfilePicture512(sessionStorage.getItem("profilePicture512"));
      setBiography(sessionStorage.getItem("biography"));
      setLearningLanguage(sessionStorage.getItem("learningLanguages"));
      setNativeLanguage(sessionStorage.getItem("nativeLanguage"));
    }
    if (!isLocalStorageEmpty) {
      setAppLanguage(localStorage.getItem("LinguPingu_appLanguage"));
    }
  }, []);

  useEffect(() => {
    if (!appLanguage) return;
    i18next.changeLanguage(appLanguage);
  }, [appLanguage]);

  // * HTML code of the NavigationBar component.
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light position-relative w-100">
      <div className="container-fluid d-flex justify-content-between">
        <div className="d-flex">
          <Link className="navbar-brand" to="/home">
            LinguPingu
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          ref={navbarNavRef}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/vocabulary">
                {tp("navbar.vocabulary")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/grammar">
                {tp("navbar.grammar")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/games">
                {tp("navbar.games")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center ml-auto">
          <div
            className="d-flex align-items-center me-3"
            onClick={() => toggleLanguage(appLanguage)}
            style={{ cursor: "pointer" }}>
            <Flag
              code={appLanguage === "en" ? "gb" : appLanguage}
              height="24"
              width="48"
            />
          </div>
          <Navbar.Text className="ms-2 me-3">
            {tp("navbar.welcome")}
          </Navbar.Text>
          <Dropdown className="border border-secondary rounded">
            <Dropdown.Toggle variant="none" className="text-dark">
              <span className="ms-2 me-3">{username || "User"}</span>
              <Image
                roundedCircle
                src={profilePicture64 || "https://via.placeholder.com/150"}
                className="img-fluid w-25"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profile">
                {tp("navbar.profile")}
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/settings">
                {tp("navbar.settings")}
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/landing" onClick={logout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
