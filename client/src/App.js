import React from 'react';
import { Route } from 'react-router-dom';
import GamePage from './components/GamePage';

const App = () => (
  <div>
    <Route path="/:room[:playerName]" component={GamePage} />
  </div>
);

export default App;
