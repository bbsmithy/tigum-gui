import React from 'react';
import { Login } from '../views/auth';

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
    case AUTH_SCREENS.LOGIN:
      return <Login navigate={navigate} />;
    default:
      return <div>Howya</div>;
  }
};
