import React from 'react';
import { connect } from 'react-redux';
import ping from '../actions/ping';
import helloWorld from '../actions/helloWorld';
import inputs from '../actions/inputs';

const GamePage = props => {
  const input = (event, props) => {
    props.inputs(event.keyCode);
  };

  ping();
  helloWorld();
  return (
    <div tabIndex="0" onKeyDown={event => input(event, props)}>
      <div>GamePage</div>
      <div>Last input : {props.input}</div>
    </div>
  );
};

function mapStateToProps(state) {
  const input = state.inputs.input;
  return {
    input,
  };
}

export default connect(
  mapStateToProps,
  { ping, helloWorld, inputs },
)(GamePage);
