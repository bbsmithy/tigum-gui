import React from 'react';
import { Login, SignUp } from '../views/auth';

export enum AUTH_SCREENS {
  SIGNUP,
  LOGIN,
}

type NoteRouterType = {
  screen: AUTH_SCREENS;
  navigate: (screen: AUTH_SCREENS) => void;
};

export const AuthRouter = ({ screen, navigate }: NoteRouterType) => {
  switch (screen) {
    case AUTH_SCREENS.SIGNUP:
      return <SignUp navigate={navigate} />;
    case AUTH_SCREENS.LOGIN:
      return <Login navigate={navigate} />;
    default:
      return <div>Howya</div>;
  }
};
