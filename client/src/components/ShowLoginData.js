import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [loginData, setLoginData] = useState([]);

useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URI}/users`)
        .then((response) => response.json())
        .then((data) => {
            console.log('Data:', data);
            setLoginData(data);
        })
        .catch((error) => console.error(error));
}, []);
      /* loginData.map((item) => {
            console.log(item.username);
      }); */

  return (
    <div className="bg-light p-3 rounded">
        {loginData.map((item) => (
            <div key={item.username} className="bg-danger">
                Username: {item.username}, Password: {item.password}
            </div>
        ))}
    </div>
  );
}

export default Login;
