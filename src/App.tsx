import React, { useEffect } from "react";
import "./App.css";
import { Auth } from "./Auth";
import { StateProvider, useStateValue } from "./state/StateProvider";
import { reducer, initialState } from "./state/Reducer";

/**
 * DK {
 *  desc: The App component is the parent component for the entire app. It contains the StateProvider[./state/StateProvider] component
 *  which provides the global state of devkeep using the context API. It also contains the Auth[./Auth] component which is responsible for
 *  deciding to show login page or proceed to app.
 * }
 */
const App: React.FC = () => {
  return (
    <div className="App">
      <StateProvider initialState={initialState} reducer={reducer}>
        <Auth />
      </StateProvider>
    </div>
  );
};

export default App;
