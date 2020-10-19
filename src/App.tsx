import React from 'react';
import './App.css';
import { Auth } from './layout/Auth';
import { StateProvider } from './state/StateProvider';
import { reducer, initialState } from './state/Reducer';
import { EvervaultProvider } from '@evervault/react';

const App: React.FC = () => {
  return (
    <div className='App'>
      <EvervaultProvider teamId={'de1598fa434c'}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Auth />
        </StateProvider>
      </EvervaultProvider>
    </div>
  );
};

export default App;
