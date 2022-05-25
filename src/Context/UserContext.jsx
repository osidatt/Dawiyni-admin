import jwtDecode from "jwt-decode";
import React, { createContext, useState, useEffect, useContext } from "react";
const UserContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState(window?.localStorage?.getItem("token"));
  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
  }
  let defaultUser = decoded ? decoded : null;

  // For basic user info (id, model)
  const [userMetaData, setUserMetaData] = useState(defaultUser);

  useEffect(() => {
    if (token) {
      try {
        let decoded = jwtDecode(token);
        if (Date.now() >= decoded.exp * 1000) {
          throw Error("token expired");
        }
        // To get token data
        setUserMetaData({
          ...decoded,
        });
      } catch (error) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  }, [token]);

  // useEffect(() => {
  //   if (userMetaData) {
  //     refetch();
  //   }
  // }, [userMetaData]);

  return (
    <UserContext.Provider value={{ userMetaData, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext can only be used inside UserProvider");
  }
  return context;
}
