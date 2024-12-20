import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../components/common/LoadingSpinner";
import angryPingu from "../images/PinguIcons/angryPingu.png";
import happyPingu from "../images/PinguIcons/happyPingu.png";
import excitedPingu from "../images/PinguIcons/excitedPingu.png";
import "../styles/Landing.css";
const LandingPage = () => {
  const [t] = useTranslation("mainPages");
  const [isLoadingGuestLogin, setIsLoadingGuestLogin] = useState(false);
  const navigate = useNavigate();
  const guestLogin = async () => {
    try{
      setIsLoadingGuestLogin(true);
      const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/guestLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: 'include',
      });
      if (!response.ok) {
        setIsLoadingGuestLogin(false);
        console.log(response);
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      if(data){
        setIsLoadingGuestLogin(false);
        console.log("Guest login successful");
        navigate("/home");
      }
    }catch(error){
      setIsLoadingGuestLogin(false);
      console.error("Fetch error:", error);
    }
    
  }
  if(isLoadingGuestLogin){
    return <LoadingSpinner/>
  }
  return (
    <>
      <div className="row justify-content-center align-items-center p-5 g-0">
        <div className="col">
          
          <img src={excitedPingu} className="ad-headline-img user-select-none" />
        </div>
        <div className="col">
          <div>
          <h1 className="display-1 mb-2 user-select-none">LinguPingu</h1>
          <h3 className="mb-3 user-select-none">Die beste Lernplattform für Sprachen. </h3>
          <h3 className="user-select-none">Effektiv und kostenlos.</h3>
          <button
            onClick={() => navigate("/registration")}
            className="btn btn-primary btn-lg m-2"
          >
            {t("home.registerButton")}
          </button>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-outline-primary m-2"
          >
            {t("home.loginButton")}
          </button>
          </div>
          <button onClick={()=>guestLogin()}
          className="btn btn-outline-secondary m-2">
            {t("home.guestButton")}
        </button>
        </div>
        
      </div>
      
      <div className="bg-primary position-relative">
        <h2 className="d-flex justify-content-center align-items-center p-5  text-center">Warum eine Sprache mit LinguPingu lernen?</h2>
        <div className="d-flex flex-column justify-content-around align-items-center bg-dark-v2">
          <div className=" ad-box-v2">
            <div className="m-5 ">
              <h5 className="ad-headline display-4">Spaß haben!</h5>
              <p>
                Tauche ein in unsere abwechslungsreichen Vokabelspiele, die nicht nur lehrreich,
                sondern auch unterhaltsam sind. Wir bieten eine einzigartige Möglichkeit, den Lernprozess zu gestalten,
                indem wir Spaß und Effektivität miteinander verbinden. Entdecke die Freude am Lernen durch unsere kreativen
                und interaktiven Vokabelspiele.</p>
            </div>
            <img src={happyPingu} alt="happyPingu" className="ad-img user-select-none" />
          </div>
          <div className="ad-box-v2 ">
            <img src={angryPingu} alt="happyPingu" className="ad-img user-select-none" />
            <div className="m-5">
              <h5 className="ad-headline display-4">Motivation</h5>
              <p>In unserer Umgebung wird es für dich einfach, das Erlernen von Sprachen zu einer Gewohnheit zu machen.
                Das erreichen wir durch unterhaltsame Funktionen und fesselnde Herausforderungen.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
