import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ping from '../actions/ping';
import inputs from '../actions/inputs';
import getPiece from '../actions/getPiece';
import fallPiece from '../actions/fallPiece';

import '../style.css';

const GamePage = props => {
  useEffect(() => {
    // key handler hook
    const input = event => {
      console.log(event.keyCode);
      props.inputs(event.keyCode);
    };
    window.addEventListener('keydown', input);
    return () => {
      window.removeEventListener('keydown', input);
    };
  });

  useEffect(() => {
    // piece handler hook
    if (!props.game.piece) props.getPiece();
  });

  useEffect(() => {
    // fall handler hook
    const interval = window.setInterval(() => {
      props.fallPiece();
    }, 1000);
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const COLOR = {
    0: 'black',
    1: 'white',
  };

  ping();

  return (
    <div>
      <div>GamePage</div>
      <div className="board">
        {props.game.boardFlex.map(line => {
          return (
            <div className="line">
              {line.map(element => (
                <div
                  className="element"
                  style={{ backgroundColor: COLOR[element] }}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

GamePage.propTypes = {
  ping: PropTypes.func.isRequired,
  inputs: PropTypes.func.isRequired,
  getPiece: PropTypes.func.isRequired,
  fallPiece: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}

export default connect(
  mapStateToProps,
  { ping, inputs, getPiece, fallPiece },
)(GamePage);
