import { useEffect } from "react";

const useRefreshToken = () => {
  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/refreshToken`, {
          method: "POST",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Token refresh failed");
        }
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);
};

export default useRefreshToken;