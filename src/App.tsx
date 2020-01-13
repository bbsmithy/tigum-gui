import React, { useEffect } from "react";
import "./App.css";
import { Auth } from "./Auth";
import { StateProvider, useStateValue } from "./state/StateProvider";
import { reducer, initialState } from "./state/Reducer";

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
