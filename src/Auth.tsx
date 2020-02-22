import React, { useState } from "react";
import { useEffect } from "react";
import { checkLogin } from "./client-lib/api";
import { useStateValue } from "./state/StateProvider";
import { MainContent } from "./main-content-view";
import { AuthRouter, AUTH_SCREENS } from "./routers/AuthRouter";

export const Auth = () => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const [showSplash, setShowSplash] = useState(true);
  const [authScreen, setAuthScreen] = useState(AUTH_SCREENS.LOGIN);

  /**
   * DK {
   *  id: "isUserLoggedIn"
   *  desc: "The isUserLoggedIn function checks wheather 
   *  the user is already logged in by sending the LINK[checkLogin] 
   *  request which will send on jwt token stored in the private cookie __silly_devkeep"
   * }
   */
  const isUserLoggedIn = async () => {
    try {
      const user = await checkLogin();
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      setShowSplash(false);
    } catch (e) {
      setShowSplash(false);
    }
  };

  const navigate = (screen: AUTH_SCREENS) => {
    setAuthScreen(screen);
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  if (showSplash && !state.user.loggedIn) {
    return (
      <div
        style={{
          margin: "auto",
          textAlign: "center",
          marginTop: "22%",
          backgroundColor: "#1f1f1f",
          height: "100%",
          width: "100%"
        }}
      >
        <img src={require("./logo.png")} height={45} />
      </div>
    );
  }

  return (
    <>
      {state.user && state.user.loggedIn ? (
        <MainContent />
      ) : (
        <AuthRouter screen={authScreen} navigate={navigate} />
      )}
    </>
  );
};
