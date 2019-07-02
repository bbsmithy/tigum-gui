import React, { useState } from "react";
import "./App.css";
import { SideBar } from "./sidebar-navigator";
import { MainContent } from "./main-content-view";
import { TopicNavigationBar } from "./topic-navigation-bar";
import { ScreenRouter, SCREENS } from "./screens/ScreenRouter";

const App: React.FC = () => {
  const [screen, setScreen] = useState(SCREENS.NONE);
  const [data, setData] = useState({});

  const navigate = (screen: SCREENS, data: object) => {
    setScreen(screen);
    setData(data);
  };

  return (
    <div className="App">
      <SideBar navigate={navigate} />
      <TopicNavigationBar />
      <MainContent>
        <ScreenRouter screen={screen} data={data} />
      </MainContent>
    </div>
  );
};

export default App;
