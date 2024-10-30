import React, { useEffect } from "react";

// * Exports the UserContext and UserProvider.
export const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  // * The user state stores the user data.
  const [user, setUser] = React.useState(null);

  // * Functions to login and logout the user.
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  // * reloadUser() is used to reload the user from local storage.
  const reloadUser = () => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  };

  // * userEffect() is used to load the user from local storage after the page is loaded / refreshed.
  useEffect(() => {
    console.log("UserProvider.js: useEffect()");
    // * The User is loaded from local storage.
    const data = localStorage.getItem("user");
    if (data) {
      login(JSON.parse(data));
      console.log("User loaded from local storage:", JSON.parse(data));
    }
  }, []);

  // * The UserContext provides the user data and login/logout functions to all child components.
  return (
    <UserContext.Provider value={{ user, login, logout, setUser, reloadUser }}>
      {children}
    </UserContext.Provider>
  );
};
