import React, { useState } from 'react';
import { useEffect } from 'react';
import { checkLogin } from '../clib/api';
import { useStateValue } from '../state/StateProvider';
import { MainContent } from './main';
import { AuthRouter, AUTH_SCREENS } from '../routers/AuthRouter';

export const Auth = () => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const [showSplash, setShowSplash] = useState(true);
  const [authScreen, setAuthScreen] = useState(AUTH_SCREENS.LOGIN);

  const isUserLoggedIn = async () => {
    try {
      const user = await checkLogin();
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
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
          margin: 'auto',
          textAlign: 'center',
          marginTop: '22%',
          backgroundColor: '#1f1f1f',
          height: '100%',
          width: '100%',
        }}
      >
        <img src={require('../logo-tigum.png')} height={100} />
      </div>
    );
  }

  return (
    <>
      {state.user.loggedIn ? (
        <MainContent />
      ) : (
        <AuthRouter screen={authScreen} navigate={navigate} />
      )}
    </>
  );
};
