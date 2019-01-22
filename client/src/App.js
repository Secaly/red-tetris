import React from 'react';
import { Route } from 'react-router-dom';
import GamePageMP from './components/GamePageMP';
import GamePageSP from './components/GamePageSP';

const App = props => {
  console.log(history);

  return (
    <div>
      <Route exact path="/" component={GamePageSP} />
      <Route exact path="/:room[:playerName]" component={GamePageMP} />
    </div>
  );
};

export default App;
