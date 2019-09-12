import React, { createContext, Component } from "react";

type AppContextType = {
  topics: Array<any>;
  selectedTopicIndex: number;
  notes: Array<any>;
  resources: Array<any>;
};

const AppContext = createContext({});

class AppContextProvider extends Component {
  state: AppContextType = {
    topics: [],
    selectedTopicIndex: 0,
    notes: [],
    resources: []
  };

  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
