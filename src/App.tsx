import React, { useState, useEffect, ChangeEventHandler } from "react";
import "./App.css";
import { MainContent } from "./main-content-view";
import { StateProvider } from "./state/StateProvider";
import { reducer, initialState } from "./state/Reducer";

const App: React.FC = () => {
  return (
    <div className="App">
      <StateProvider initialState={initialState} reducer={reducer}>
        <MainContent />
      </StateProvider>
    </div>
  );
};

export default App;
