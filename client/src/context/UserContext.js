import React,{useState} from "react";
// * Exports the UserContext and UserProvider.
export const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [id, setId] = useState(-1);
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
    <UserContext.Provider value={{ logout, id ,setId }}>{children}</UserContext.Provider>
  );
};
