import React from "react";
import { Login } from "./Login";
import { useEffect } from "react";
import { checkLogin } from "./client-lib/api";
import { useStateValue } from "./state/StateProvider";
import { MainContent } from "./main-content-view";

export const Auth = () => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();

  const isUserLoggedIn = async () => {
    try {
      const user = await checkLogin();
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (e) {}
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return <>{state.user && state.user.loggedIn ? <MainContent /> : <Login />}</>;
};
