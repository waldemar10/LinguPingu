import React,{useState} from "react";
// * Exports the UserContext and UserProvider.
export const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [id, setId] = useState(-1);
  const [username, setUsername] = useState(null);
  const [country, setCountry] = useState(null);
  const [biography, setBiography] = useState(null);
  const [profilePicture64,setProfilePicture64] = useState(null);
  const [profilePicture512,setProfilePicture512] = useState(null);
  const logout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_SERVER_URI}/logout`, {
        method: "POST",
        credentials: "include",
      });
      sessionStorage.clear();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <UserContext.Provider value={{ logout, id ,setId,username,setUsername,country,setCountry,biography,setBiography,
      profilePicture64,setProfilePicture64, profilePicture512,setProfilePicture512 }}>{children}</UserContext.Provider>
  );
};
