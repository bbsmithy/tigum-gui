import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { checkLogin } from '../clib/api';
import { useStateValue } from '../state/StateProvider';
import { MainContent } from './main';
import { AuthRouter, AUTH_SCREENS } from '../routers/AuthRouter';
import { useReactPath } from '../hooks';
import { goto } from '../util';

export const Auth = () => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const [showSplash, setShowSplash] = useState(true);
  const [authScreen, setAuthScreen] = useState(null);
  const path = useReactPath();
  const loginCheckedRef = useRef(false)

  useEffect(() => {
    isUserLoggedIn()
  }, [])

  useEffect(() => {
    if (!state.user.loggedIn) {
      checkForAuthScreenUpdate()
    }
  }, [path])

  const checkForAuthScreenUpdate = () => {
    const pathVars = window.location.pathname.split(/\//)
    const screen = pathVars[1]
    if (screen === "login") {
      navigate(AUTH_SCREENS.LOGIN)
    } else if (screen === "signup") {
      navigate(AUTH_SCREENS.SIGNUP)
    } else if (screen === "verify") {
      navigate(AUTH_SCREENS.VERIFY)
    } else if (screen === ""){
      goto("login")
    }
  }

  const isUserLoggedIn = async () => {
    try {
      const user = await checkLogin();
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      setShowSplash(false);
      loginCheckedRef.current = true
    } catch (e) {
      setShowSplash(false);
      loginCheckedRef.current = true
    }
  };

  const navigate = (screen: AUTH_SCREENS) => {
    setAuthScreen(screen);
  };

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
