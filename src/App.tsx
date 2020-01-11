import React, { useEffect } from "react";
import "./App.css";
import { Login } from "./Login";
import { Auth } from "./Auth";
import { StateProvider, useStateValue } from "./state/StateProvider";
import { reducer, initialState } from "./state/Reducer";

const App: React.FC = () => {
  const renderSplashScreen = () => {
    return <p>Splash screen</p>;
  };

  return (
    <div className="App">
      <StateProvider initialState={initialState} reducer={reducer}>
        <Auth />
      </StateProvider>
    </div>
  );
};

export default App;
