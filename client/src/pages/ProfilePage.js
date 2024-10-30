import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import NavigationBar from "../components/NavigationBar";
import Flag from "react-world-flags";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function ProfilePage() {
  const [t] = useTranslation("profile");
  const { user, reloadUser } = useContext(UserContext); // Zugriff auf den Benutzer aus dem Kontext

  const [isEditing, setIsEditing] = useState(false);
  const [biography, setBiography] = useState(user ? user.biography : "");
  const [languagesLearning, setLanguagesLearning] = useState(null);
  const [languagesNative, setLanguagesNative] = useState(null);
  const handleEditClick = () => {
    setIsEditing(true);
  };

 /*  console.log("User:", user); */

  const handleSaveClick = async (event) => {
    event.preventDefault();

    setIsEditing(false);

    const user = JSON.parse(localStorage.getItem("user"));
    user.biography = biography;
    localStorage.setItem("user", JSON.stringify(user));
    reloadUser();

    try {
      fetch("http://localhost:5000/biography", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          biography: biography,
        }),
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
  if (user) {
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
  }
  if (!user || languagesLearning === null || languagesNative === null) {
    return <div>Loading...</div>;
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
                    {biography}
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
