import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { LanguageContext } from "../context/LanguageContext";
import NavigationBar from "../components/NavigationBar";
import Flag from "react-world-flags";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import UserService from "../services/UserService";
import LoadingSpinner from "../components/common/LoadingSpinner";
function ProfilePage() {
  const [t] = useTranslation("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [learningLanguageProfile, setLearningLanguageProfile] = useState();
  const {
    isLoadingUser,
    username,
    biography,
    setBiography,
    country,
    profilePicture512,
  } = useContext(UserContext);
  const { learningLanguage, nativeLanguage } = useContext(LanguageContext);
  useEffect(() => {
    setLearningLanguageProfile(learningLanguage);
    if (learningLanguage === "en") setLearningLanguageProfile("gb");
  }, [learningLanguage]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();

    setIsEditing(false);

    try {
      const data = {
        username: username,
        biography: biography,
      };
      UserService.updateBiography(data)
        .then(() => {
          console.log("Erfolgreich gespeichert");
        })
        .catch((error) => {
          console.error("Fehler:", error);
        });
    } catch (error) {
      console.error("Fehler:", error);
    }
  };

  if (isLoadingUser) {
    return <LoadingSpinner />;
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
          style={{ height: "90%" }}>
          {/**
           * Big Profile Picture
           */}
          <div className="d-flex flex-wrap justify-content-center align-items-center m-4 pt-3">
            <Image
              src={profilePicture512}
              alt="Profilbild"
              className="rounded-circle img-fluid m-5 justify-content-center border border-secondary border-3"
              style={{ width: "30%", height: "auto" }}
            />

            {/**
             * Username
             */}
            <h1 className="m-4" style={{ fontSize: "3rem" }}>
              {username}
            </h1>

            {/**
             * Country
             */}
            <div className="d-flex align-items-center justify-content-center m-1">
              <Flag
                code={country}
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
                      className="btn btn-primary mt-2">
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
              className="d-flex flex-column align-items-center justify-content-center">
              {/**
               * Native Language
               */}
              <div className="d-flex flex-column align-items-center justify-content-center m-3">
                <h3 className="mt-3">{t("nativeLanguages")}</h3>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <Flag
                    key={nativeLanguage}
                    code={nativeLanguage}
                    height="32"
                    style={{ margin: "0 5px" }}
                  />
                </div>
              </div>
            </Col>
            <Col
              md={4}
              className="d-flex flex-column align-items-center justify-content-center">
              {/**
               * Learning Languages
               */}
              <div className="d-flex flex-column align-items-center justify-content-center">
                <h3 className="mt-3">{t("learningLanguages")}</h3>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <Flag
                    key={learningLanguageProfile}
                    code={learningLanguageProfile}
                    height="32"
                    style={{ margin: "0 5px" }}
                  />
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
