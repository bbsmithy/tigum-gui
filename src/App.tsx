import React from "react";
import "./App.css";
import { SideBar } from "./sidebar-navigator";
import { MainContent } from "./main-content-view";

const App: React.FC = () => {
  return (
    <div className="App">
      <SideBar />
      <MainContent />
    </div>
  );
};

export default App;
