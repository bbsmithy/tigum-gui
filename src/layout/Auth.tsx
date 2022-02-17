import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { checkLogin } from "../clib/api";
import { useStateValue } from "../state/StateProvider";
import { MainContent } from "./main";
import { PublicRouter, PUBLIC_SCREENS } from "../routers/PublicRouter";
import { useReactPath } from "../hooks";
import { goto } from "../util";

export const Auth = () => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const [showSplash, setShowSplash] = useState(true);
  const [authScreen, setAuthScreen] = useState(null);
  const path = useReactPath();
  const loginCheckedRef = useRef(false);

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  useEffect(() => {
    if (!state.user.loggedIn && loginCheckedRef.current) {
      checkForAuthScreenUpdate();
    }
  }, [path, showSplash]);

  const checkForAuthScreenUpdate = () => {
    const pathVars = window.location.pathname.split(/\//);
    const screen = pathVars[1];
    if (screen === "login") {
      navigate(PUBLIC_SCREENS.LOGIN);
    } else if (screen === "signup") {
      navigate(PUBLIC_SCREENS.SIGNUP);
    } else if (screen === "verify") {
      navigate(PUBLIC_SCREENS.VERIFY);
    } else if (screen === "request-access") {
      navigate(PUBLIC_SCREENS.REQUEST_ACCESS);
    } else if (screen === "p") {
      navigate(PUBLIC_SCREENS.PROFILE);
    } else {
      goto("login");
    }
  };

  const isUserLoggedIn = async () => {
    try {
      const user = await checkLogin();
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      setShowSplash(false);
      loginCheckedRef.current = true;
    } catch (e) {
      setShowSplash(false);
      loginCheckedRef.current = true;
    }
  };

  const navigate = (screen: PUBLIC_SCREENS) => {
    setAuthScreen(screen);
  };

  if (showSplash && !state.user.loggedIn) {
    return (
      <div
        style={{
          margin: "auto",
          textAlign: "center",
          marginTop: "22%",
          backgroundColor: "#1f1f1f",
          padding: 20,
          height: "100%",
          width: "100%",
        }}
      >
        <img src={require("../logo-tigum.png")} style={{ maxHeight: 200 }} />
      </div>
    );
  }

  return (
    <>
      {state.user.loggedIn ? (
        <MainContent />
      ) : (
        <PublicRouter screen={authScreen} navigate={navigate} />
      )}
    </>
  );
};
