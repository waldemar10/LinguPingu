import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import NavigationBar from "../components/NavigationBar";
import Flag from "react-world-flags";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
function ProfilePage() {
  const [t] = useTranslation("profile");

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState();
  const [country, setCountry] = useState();
  const [biography, setBiography] = useState();
  const [learningLanguage, setLearningLanguage] = useState();
  const [nativeLanguage, setNativeLanguage] = useState();
  const [profilePicture512,setProfilePicture512] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  const { id, setId } = useContext(UserContext);
  const navigate = useNavigate();
  const fetchProtectedData = async () => {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URI}/protected`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
      navigate("/landing");
    } 
  };
  useEffect(() => {
    fetchProtectedData();
  }, []);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const fetchUserData = async () => {
    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/user`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsername(data.username);
      setBiography(data.biography);
      setProfilePicture512(data.profilePicture512);
      setCountry(data.country);
      setLearningLanguage(data.learningLanguages);
      setNativeLanguage(data.nativeLanguage);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("biography", data.biography);
      sessionStorage.setItem("profilePicture64", data.profilePicture64);
      sessionStorage.setItem("profilePicture512", data.profilePicture512);
      sessionStorage.setItem("country", data.country);
      sessionStorage.setItem("verified", data.verified);
      localStorage.setItem(`${data._id}_learningLanguages`, data.learningLanguages[0]);
      localStorage.setItem(`${data._id}_nativeLanguage`, data.nativeLanguage[0]);
      localStorage.setItem(`${data._id}_appLanguage`, data.nativeLanguage[0]);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoadingUser(false);
    }
  };
  useEffect(() => {
    setLoadingUser(true);
    if (sessionStorage.getItem("username") !== null) {
      setUsername(sessionStorage.getItem("username"));
    }
    if(sessionStorage.getItem("biography") !== null){
      setBiography(sessionStorage.getItem("biography"));
    }
    if (sessionStorage.getItem("profilePicture512") !== null) {
      setProfilePicture512(sessionStorage.getItem("profilePicture512"));
    }
    if (sessionStorage.getItem("country") !== null) {
      setCountry(sessionStorage.getItem("country"));
    }
    if (localStorage.getItem(`${id}_learningLanguages`) !== null) {
      setLearningLanguage(localStorage.getItem(`${id}_learningLanguages`));
    }
    if (localStorage.getItem(`${id}_nativeLanguage`) !== null) {
      setNativeLanguage(localStorage.getItem(`${id}_nativeLanguage`));
    }
    if (
      !sessionStorage.getItem("username") ||
      !localStorage.getItem(`${id}_learningLanguages`) ||
      !localStorage.getItem(`${id}_nativeLanguage`) ||
      !sessionStorage.getItem("profilePicture512") ||
      !sessionStorage.getItem("country")
    ) {
      fetchUserData();
    }else{
      setLoadingUser(false);
    }
  }, []);

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  const handleSaveClick = async (event) => {
    event.preventDefault();

    setIsEditing(false);

    try {
      fetch(`${process.env.REACT_APP_SERVER_URI}/biography`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          biography: biography,
        }),
        credentials: "include",
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
                      key={learningLanguage}
                      code={learningLanguage}
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
