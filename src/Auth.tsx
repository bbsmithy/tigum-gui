import React, { useState } from "react";
import { Login } from "./Login";
import { useEffect } from "react";
import { checkLogin } from "./client-lib/api";
import { useStateValue } from "./state/StateProvider";
import { MainContent } from "./main-content-view";

export const Auth = () => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const [showSplash, setShowSplash] = useState(true);

  const isUserLoggedIn = async () => {
    try {
      const user = await checkLogin();
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      setShowSplash(false);
    } catch (e) {
      setShowSplash(false);
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  if (showSplash && !state.user.loggedIn) {
    return (
      <div style={{ margin: "auto", textAlign: "center", marginTop: "22%" }}>
        <img src={require("./logo.png")} height={45} />
      </div>
    );
  }

  return <>{state.user && state.user.loggedIn ? <MainContent /> : <Login />}</>;
};
