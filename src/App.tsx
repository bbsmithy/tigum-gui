import React from 'react';
import './App.css';
import { Auth } from './layout/Auth';
import { StateProvider } from './state/StateProvider';
import { reducer, initialState } from './state/Reducer';

const App: React.FC = () => {
  return (
    <div className='App'>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Auth />
      </StateProvider>
    </div>
  );
};

export default App;
