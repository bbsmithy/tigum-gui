import React from 'react';
import { Login, Verify, Signup, RequestAccess } from '../views/auth';
import { Profile } from '../views/profile';

export enum PUBLIC_SCREENS {
  SIGNUP,
  LOGIN,
  VERIFY,
  REQUEST_ACCESS,
  PROFILE
}

type NoteRouterType = {
  screen: PUBLIC_SCREENS;
  navigate: (screen: PUBLIC_SCREENS) => void;
};

export const PublicRouter = ({ screen, navigate }: NoteRouterType) => {
  switch (screen) {
    case PUBLIC_SCREENS.LOGIN:
      return <Login navigate={navigate} />;
    case PUBLIC_SCREENS.SIGNUP:
      return <Signup navigate={navigate} />
    case PUBLIC_SCREENS.VERIFY:
      return <Verify navigate={navigate} />
    case PUBLIC_SCREENS.REQUEST_ACCESS:
      return <RequestAccess navigate={navigate} />
    default:
      return null
  }
};
