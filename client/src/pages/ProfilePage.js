import { useContext, useState,useEffect } from "react";
import { UserContext } from "../context/UserContext";
import NavigationBar from "../components/NavigationBar";
import Flag from "react-world-flags";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [t] = useTranslation("profile");
  const { reloadUser } = useContext(UserContext); // Zugriff auf den Benutzer aus dem Kontext

  const [isEditing, setIsEditing] = useState(false);
  const [biography, setBiography] = useState("");
  const [languagesLearning, setLanguagesLearning] = useState("");
  const [languagesNative, setLanguagesNative] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();
  const handleEditClick = () => {
    setIsEditing(true);
  };

 /*  console.log("User:", user); */
 const fetchUserData = async () => {
  setLoadingUser(true);
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/user`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setUser(data);
    setBiography(data.biography);
    setLanguagesLearning(data.learningLanguages);
    setLanguagesNative(data.nativeLanguage);
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    setLoadingUser(false);
    
  }
};
useEffect(() => {
  fetchUserData();
}, [navigate]);

if (loadingUser) {
  return <div>Loading...</div>;
}

  const handleSaveClick = async (event) => {
    event.preventDefault();

    setIsEditing(false);

    /* const user = JSON.parse(localStorage.getItem("user")); */
    
    if (!user) {
      return;
    }
    user.biography = biography;
    /* localStorage.setItem("user", JSON.stringify(user)); */
    /* reloadUser(); */

    try {
      fetch(`${process.env.REACT_APP_SERVER_URI}/biography`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          biography: biography,
        }),
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Erfolg:", data);
        })
        .catch((error) => {
          console.error("Fehler:", error);
        });
    } catch (error) {
      console.error("Fehler:", error);
    }
  };

 
    if (languagesLearning === null) {
      const updatedLanguages = user.learningLanguages.map((language) =>
        language === "en" ? "gb" : language
      );
      setLanguagesLearning(updatedLanguages);
    }
    if (languagesNative === null) {
      const updatedLanguages = user.nativeLanguage.map((language) =>
        language === "en" ? "gb" : language
      );
      setLanguagesNative(updatedLanguages);
    }
  
  return (
    <div>
      {/**
       * The Navbar component is displayed at the top the page.
       */}
      <NavigationBar />

      <Container className="d-flex flex-column align-items-center mt-4 rounded mb-5">
        {/**
         * Big "Profile" headline of the page.
         */}
        <h1 className="mt-4">{t("profile")}</h1>

        <Container
          className="d-flex flex-column justify-content-between w-100 mt-4 bg-light text-dark rounded p-4"
          style={{ height: "90%" }}
        >
          {/**
           * Big Profile Picture
           */}
          <div className="d-flex flex-wrap justify-content-center align-items-center m-4 pt-3">
            <Image
              src={user.profilePicture512}
              alt="Profilbild"
              className="rounded-circle img-fluid m-5 justify-content-center border border-secondary border-3"
              style={{ width: "30%", height: "auto" }}
            />

            {/**
             * Username
             */}
            <h1 className="m-4" style={{ fontSize: "3rem" }}>
              {user.username}
            </h1>

            {/**
             * Country
             */}
            <div className="d-flex align-items-center justify-content-center m-1">
              <Flag
                code={user.country}
                height="48"
                style={{ width: "8vw", height: "auto" }}
              />
            </div>
          </div>

          <Row className="d-flex justify-content-center align-items-center w-100">
            <Col md={8} className="d-flex flex-column align-items-center">
              {/**
               * Biography
               */}
              <div className="d-flex flex-column align-items-center justify-content-center">
                <span className="d-flex flex-row align-items-center justify-content-center">
                  <h3 className="m-1">{t("biography")}</h3>
                  {!isEditing && <FaEdit onClick={handleEditClick} />}
                </span>
                {isEditing ? (
                  <div>
                    <textarea
                      value={biography}
                      onChange={(e) => setBiography(e.target.value)}
                      className="form-control"
                      style={{ width: "50vw", height: "100px" }}
                    />
                    <button
                      onClick={handleSaveClick}
                      className="btn btn-primary mt-2"
                    >
                      {t("save")}
                    </button>
                  </div>
                ) : (
                  <span className="text-center" style={{ width: "50vw" }}>
                    {user.biography}
                  </span>
                )}
              </div>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center w-100">
            <Col
              md={4}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              {/**
               * Native Language
               */}
              <div className="d-flex flex-column align-items-center justify-content-center m-3">
                <h3 className="mt-3">{t("nativeLanguages")}</h3>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  {languagesNative.map((language) => (
                    <Flag
                      key={language}
                      code={language}
                      height="32"
                      style={{ margin: "0 5px" }}
                    />
                  ))}
                </div>
              </div>
            </Col>
            <Col
              md={4}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              {/**
               * Learning Languages
               */}
              <div className="d-flex flex-column align-items-center justify-content-center">
                <h3 className="mt-3">{t("learningLanguages")}</h3>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  {languagesLearning.map((language) => (
                    <Flag
                      key={language}
                      code={language}
                      height="32"
                      style={{ margin: "0 5px" }}
                    />
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default ProfilePage;
