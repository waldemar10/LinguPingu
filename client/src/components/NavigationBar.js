import React, { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Dropdown, Image } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/LanguageContext";
import Flag from "react-world-flags";

import UserService from "../services/UserService";
/**
 * * The Navbar component is displayed at the top of every page (when the user is logged in).
 * @returns {JSX.Element} The Navbar component.
 */
const NavigationBar = () => {
  // * The UserContext is used to access the user data.
  const { logout,username,setUsername,profilePicture64,setProfilePicture64 } = useContext(UserContext);
  const {
    setAppLanguage,
    setNativeLanguage,
    setLearningLanguage,
    appLanguage,
    nativeLanguage,
    learningLanguage,
  } = useContext(LanguageContext);
  // * The state of the Navbar is used to determine whether the Navbar is expanded or not.
  const [isExpanded, setIsExpanded] = useState(false);
  // * The navbarNavRef is used to access the navbarNav element.
  const navbarNavRef = useRef(null);

  const [tp, i18next] = useTranslation("mainPages");

  const fetchUserData = async () => {
    try {
      UserService.getUser()
        .then((res) => {
          setUsername(res.data.username);
          setProfilePicture64(res.data.profilePicture64);
          setLearningLanguage(res.data.learningLanguages[0] === "gb" ? "en" : res.data.learningLanguages[0]);
          setNativeLanguage(res.data.nativeLanguage[0]);
          if (
            localStorage.getItem(`${res.data.username}_appLanguage`) !== null
          ) {
            setAppLanguage(
              localStorage.getItem(`${res.data.username}_appLanguage`)
            );
          } else {
            setAppLanguage(res.data.appLanguage);
            localStorage.setItem(
              `${res.data.username}_appLanguage`,
              res.data.appLanguage
            );
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(
    () => {
      const requiredKeys = ["username", "learningLanguages", "nativeLanguage"];
      const isSessionStorageEmpty = requiredKeys.some(
        (key) => !sessionStorage.getItem(key)
      );
  
      if (isSessionStorageEmpty || localStorage.getItem(`${username}_appLanguage`) === null) {
        fetchUserData();
      } else {
        setUsername(sessionStorage.getItem("username"));
        setProfilePicture64(sessionStorage.getItem("profilePicture64"));
        setLearningLanguage(sessionStorage.getItem("learningLanguages"));
        setNativeLanguage(sessionStorage.getItem("nativeLanguage"));
        setAppLanguage(localStorage.getItem(`${username}_appLanguage`));
      }
    },
    []
  );

  const toggleLanguage = () => {
    if (i18next.language === nativeLanguage) {
      i18next.changeLanguage(learningLanguage);
    } else {
      i18next.changeLanguage(nativeLanguage);
    }

    if (i18next.language === "gb") {
      i18next.changeLanguage("en");
      setAppLanguage("en");
      localStorage.setItem(`${username}_appLanguage`, "en");
    } else {
      setAppLanguage(i18next.language);
      localStorage.setItem(`${username}_appLanguage`, i18next.language);
    }
  };

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
        <div
          className={`d-flex align-items-center ml-auto ${
            isExpanded ? "d-none" : ""
          }`}>
          <div
            className="d-flex align-items-center me-3"
            onClick={() => toggleLanguage()}
            style={{ cursor: "pointer" }}>
            <Flag
              code={i18next.language === "en" ? "gb" : i18next.language}
              height="24"
              width="48"
              key={`$+"learning"`}
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
