import React from "react";
import { Login, SignUp } from "../screens/auth-screens/";

export enum AUTH_SCREENS {
  SIGNUP,
  LOGIN
}

type NoteRouterType = {
  screen: AUTH_SCREENS;
};

export const AuthRouter = ({ screen }: NoteRouterType) => {
  switch (screen) {
    case AUTH_SCREENS.SIGNUP:
      return <SignUp />;
    case AUTH_SCREENS.LOGIN:
      return <Login />;
    default:
      return <div>Howya</div>;
  }
};
