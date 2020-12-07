import React from 'react';

export const useReactPath = () => {
  const [path, setPath] = React.useState(window.location.pathname);
  const listenToPopstate = () => {
    const winPath = window.location.pathname;
    setPath(winPath);
  };
  React.useEffect(() => {
    window.addEventListener('popstate', listenToPopstate);
    window.addEventListener('locationChange', listenToPopstate);
    return () => {
      window.removeEventListener('popstate', listenToPopstate);
      window.removeEventListener('locationChange', listenToPopstate);
    };
  }, []);
  return path;
};