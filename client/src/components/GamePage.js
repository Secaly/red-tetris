import React from 'react';
import { connect } from 'react-redux';
import ping from '../actions/ping';
import helloWorld from '../actions/helloWorld';

const GamePage = () => {
  ping();
  helloWorld();
  return <div>GamePage</div>;
};

export default connect(
  null,
  { ping, helloWorld },
)(GamePage);
