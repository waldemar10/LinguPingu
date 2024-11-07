import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

import excitedPingu from "../images/PinguIcons/excitedPingu.png";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
const GamesPage = () => {
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
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center g-0">
        <NavigationBar className="mb-5" />

        <div className="d-flex flex-column mt-5">
          <h1 className="text-center w-100 display-1">Games</h1>
        </div>
        <div className="vh100">
          <img src={excitedPingu} className="img-home user-select-none"></img>
        </div>

        <div className="home-box mt-4">
          <Link
            className="btn home-button bg-home-button text-white btn-hover text-uppercase"
            to="/games/memory"
          >
            <h3>Memory</h3>
          </Link>

          <Link
            className="btn home-button bg-home-button text-white btn-hover text-uppercase"
            to="/games/timeAttack"
          >
            <h3>Time Attack</h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default GamesPage;
