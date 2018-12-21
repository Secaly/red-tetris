import _ from 'lodash';
import { CLIENT_INPUT, CLIENT_FALLPIECE, SERVER_GETPIECE } from '../types';

const initialState = {
  boardFix: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  boardFlex: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  piece: '',
};

const joinPiece = game => {
  game.boardFlex = game.boardFix.map(x => x.slice(0));
  _.forEach(game.piece.form[game.piece.rotation], (line, lineIndex) =>
    _.forEach(line, (cell, cellIndex) => {
      if (
        game.boardFlex[game.piece.pos[0] + lineIndex][
          game.piece.pos[1] + cellIndex
        ] === 0
      ) {
        game.boardFlex[game.piece.pos[0] + lineIndex][
          game.piece.pos[1] + cellIndex
        ] = cell;
      }
    }),
  );
};

const fixPiece = game => {
  _.forEach(game.piece.form[game.piece.rotation], (line, lineIndex) =>
    _.forEach(line, (cell, cellIndex) => {
      if (
        game.boardFix[game.piece.pos[0] + lineIndex][
          game.piece.pos[1] + cellIndex
        ] === 0
      ) {
        game.boardFix[game.piece.pos[0] + lineIndex][
          game.piece.pos[1] + cellIndex
        ] = cell;
      }
    }),
  );
  game.piece = '';
};

const isFree = (game, movement) => {
  switch (movement) {
    case 'left':
      return !game.piece.form[game.piece.rotation].some((line, lineIndex) =>
        line.some(
          (cell, caseIndex) =>
            ((game.piece.pos[1] + caseIndex > 0 &&
              game.boardFix[game.piece.pos[0] + lineIndex][
                game.piece.pos[1] + caseIndex
              ] === 1) ||
              game.piece.pos[1] + caseIndex === 0) &&
            cell === 1,
        ),
      );
    case 'right':
      return !game.piece.form[game.piece.rotation].some((line, lineIndex) =>
        line.some(
          (cell, caseIndex) =>
            ((game.piece.pos[1] + caseIndex + 1 < 10 &&
              game.boardFix[game.piece.pos[0] + lineIndex][
                game.piece.pos[1] + caseIndex + 1
              ] === 1) ||
              game.piece.pos[1] + caseIndex + 1 === 10) &&
            cell === 1,
        ),
      );
    case 'down':
      return !game.piece.form[game.piece.rotation].some((line, lineIndex) =>
        line.some(
          (cell, caseIndex) =>
            ((game.piece.pos[0] + lineIndex + 1 < 20 &&
              game.boardFix[game.piece.pos[0] + lineIndex + 1][
                game.piece.pos[1] + caseIndex
              ] === 1) ||
              game.piece.pos[0] + lineIndex + 1 === 20) &&
            cell === 1,
        ),
      );
    default:
      return true;
  }
};

const moveLeft = game => {
  if (game.piece && isFree(game, 'left')) {
    game.piece.pos[1] -= 1;
    joinPiece(game);
  }
  return { ...game };
};

const moveRight = game => {
  if (game.piece && isFree(game, 'right')) {
    game.piece.pos[1] += 1;
    joinPiece(game);
  }
  return { ...game };
};

const moveDown = game => {
  if (game.piece && isFree(game, 'down')) {
    game.piece.pos[0] += 1;
    joinPiece(game);
  } else if (game.piece && !isFree(game, 'down')) {
    fixPiece(game);
  }
  return { ...game };
};

const getPiece = game => {
  game.piece = {
    form: {
      0: [[0, 0, 0], [1, 1, 0], [0, 1, 0], [0, 1, 0]],
      1: [[0, 0, 0], [0, 1, 0], [0, 1, 1], [0, 1, 0]],
      2: [[0, 0, 0], [0, 0, 0], [1, 1, 1], [0, 1, 0]],
      3: [[0, 0, 0], [0, 1, 0], [1, 1, 0], [0, 1, 0]],
    },
    rotation: 0,
    pos: [0, 2],
  };
  joinPiece(game);
  return { ...game };
};

export default function game(state = initialState, action = {}) {
  switch (action.type) {
    case SERVER_GETPIECE:
      return getPiece(state);
    case CLIENT_FALLPIECE:
      return moveDown(state);
    case CLIENT_INPUT:
      switch (action.input) {
        case 37: {
          return moveLeft(state);
        }
        case 39: {
          return moveRight(state);
        }
        case 40: {
          return moveDown(state);
        }
        default:
          return state;
      }
    default:
      return state;
  }
}
