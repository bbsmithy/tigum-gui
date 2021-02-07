import React from 'react';
import { Login, Verify, Signup } from '../views/auth';

export enum AUTH_SCREENS {
  SIGNUP,
  LOGIN,
  VERIFY
}

type NoteRouterType = {
  screen: AUTH_SCREENS;
  navigate: (screen: AUTH_SCREENS) => void;
};

export const AuthRouter = ({ screen, navigate }: NoteRouterType) => {
  switch (screen) {
    case AUTH_SCREENS.LOGIN:
      return <Login navigate={navigate} />;
    case AUTH_SCREENS.SIGNUP:
      return <Signup navigate={navigate} />
    case AUTH_SCREENS.VERIFY:
      return <Verify navigate={navigate} />
    default:
      return null
  }
};
