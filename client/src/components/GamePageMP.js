import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import inputs from '../actions/inputs';
import getPiece from '../actions/getPiece';
import fallPiece from '../actions/fallPiece';
import startGame from '../actions/startGame';
import gameConnection from '../actions/gameConnection';

import '../style.css';

const GamePageMP = props => {
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
    if (
      !props.game.piece &&
      props.game.boardFix &&
      props.game.gameStatus === 'start'
    )
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

  useEffect(() => {
    // game connection handler hook
    props.gameConnection(props.match.params.room, 'join');
    return () => {
      props.gameConnection(props.match.params.room, 'leave');
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
    <div className="game-screen">
      <div className="game-header">
        <div className="game-title">Red Tetris</div>
        <div className="gamemode-title">Multiplayer mod</div>
        <div className="room">Room : {props.match.params.room}</div>
      </div>
      <div className="game">
        <div className="player-board">
          <div className="name">{props.match.params.playerName}</div>
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
        <div className="other-board">
          {props.game.otherPlayers.map((data, id) => {
            return [
              <div className="other-division">
                <div className="name">{data.name}</div>
                {data.board.map((line, id) => {
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
              </div>,
            ];
          })}
        </div>
      </div>
      <button className="form-button" onClick={() => props.startGame()}>
        Start
      </button>
    </div>
  );
};

GamePageMP.propTypes = {
  inputs: PropTypes.func.isRequired,
  getPiece: PropTypes.func.isRequired,
  fallPiece: PropTypes.func.isRequired,
  gameConnection: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}

export default connect(
  mapStateToProps,
  { inputs, getPiece, fallPiece, gameConnection, startGame },
)(GamePageMP);
