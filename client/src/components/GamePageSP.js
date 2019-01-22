import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Link } from 'react-router-dom';
import inputs from '../actions/inputs';
import getPiece from '../actions/getPiece';
import fallPiece from '../actions/fallPiece';
import gameConnection from '../actions/gameConnection';
import useInput from '../customHooks';

import '../style.css';

const GamePageMP = props => {
  const room = useInput();
  const userName = useInput();

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
    if (!props.game.piece && props.game.boardFix)
      props.getPiece(
        props.match.params.room,
        props.match.params.playerName,
        props.game.boardFix,
      );
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
    0: 'Black',
    1: 'Aqua',
    2: 'Blue',
    3: 'Orange',
    4: 'Yellow',
    5: 'YellowGreen',
    6: 'DarkViolet',
    7: 'Red',
  };

  return (
    <div>
      <div>GamePageSP</div>
      <div>{props.match.params.room}</div>
      <div className="game">
        <div className="board">
          <div>{props.match.params.playerName}</div>
          {props.game.boardFlex.map((line, id) => {
            return (
              <div className="line" key={id}>
                {line.map((element, id) => (
                  <div
                    className="element"
                    key={id}
                    style={{ backgroundColor: COLOR[element] }}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <input
        id="userName"
        name="userName"
        placeholder="User Name"
        {...userName}
      />
      <input id="room" name="room" placeholder="Room" {...room} />
      <button
        className="form-button"
        onClick={() => props.history.push(`/#${room.value}[${userName.value}]`)}
      >
        Join
      </button>
    </div>
  );
};

GamePageMP.propTypes = {
  inputs: PropTypes.func.isRequired,
  getPiece: PropTypes.func.isRequired,
  fallPiece: PropTypes.func.isRequired,
  gameConnection: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}

export default connect(
  mapStateToProps,
  { inputs, getPiece, fallPiece, gameConnection },
)(GamePageMP);
