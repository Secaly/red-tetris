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
        game.piece.pos[0] + lineIndex < 20 &&
        game.piece.pos[1] + cellIndex >= 0 &&
        game.piece.pos[1] + cellIndex < 10 &&
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
        game.piece.pos[0] + lineIndex < 20 &&
        game.piece.pos[1] + cellIndex >= 0 &&
        game.piece.pos[1] + cellIndex < 10 &&
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
          (cell, cellIndex) =>
            cell === 1 &&
            ((game.piece.pos[1] + cellIndex - 1 >= 0 &&
              game.boardFix[game.piece.pos[0] + lineIndex][
                game.piece.pos[1] + cellIndex - 1
              ] === 1) ||
              game.piece.pos[1] + cellIndex - 1 < 0),
        ),
      );
    case 'right':
      return !game.piece.form[game.piece.rotation].some((line, lineIndex) =>
        line.some(
          (cell, cellIndex) =>
            cell === 1 &&
            ((game.piece.pos[1] + cellIndex + 1 < 10 &&
              game.boardFix[game.piece.pos[0] + lineIndex][
                game.piece.pos[1] + cellIndex + 1
              ] === 1) ||
              game.piece.pos[1] + cellIndex + 1 === 10),
        ),
      );
    case 'down':
      return !game.piece.form[game.piece.rotation].some((line, lineIndex) =>
        line.some(
          (cell, cellIndex) =>
            cell === 1 &&
            ((game.piece.pos[0] + lineIndex + 1 < 20 &&
              game.boardFix[game.piece.pos[0] + lineIndex + 1][
                game.piece.pos[1] + cellIndex
              ] === 1) ||
              game.piece.pos[0] + lineIndex + 1 === 20),
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

const removeFullLines = game => {
  _.forEach(game.boardFix, (line, lineIndex) => {
    if (line.every(cell => cell === 1)) {
      game.boardFix.splice(lineIndex, 1);
      game.boardFix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  });
};

const moveDown = game => {
  if (game.piece && isFree(game, 'down')) {
    game.piece.pos[0] += 1;
    joinPiece(game);
  } else if (game.piece && !isFree(game, 'down')) {
    fixPiece(game);
    removeFullLines(game);
  }
  return { ...game };
};

const canRotate = (game, rotation) =>
  !rotation.some((line, lineIndex) =>
    line.some(
      (cell, cellIndex) =>
        (cell === 1 &&
          game.boardFix[game.piece.pos[0] + lineIndex][
            game.piece.pos[1] + cellIndex
          ] === 1) ||
        game.piece.pos[0] + lineIndex >= 20 ||
        game.piece.pos[1] + cellIndex < 0 ||
        game.piece.pos[1] + cellIndex >= 10,
    ),
  );

const rotateLeft = game => {
  if (canRotate(game, game.piece.form[(game.piece.rotation + 3) % 4])) {
    game.piece.rotation = (game.piece.rotation + 3) % 4;
    joinPiece(game);
  }
  return { ...game };
};

const rotateRight = game => {
  if (canRotate(game, game.piece.form[(game.piece.rotation + 5) % 4])) {
    game.piece.rotation = (game.piece.rotation + 5) % 4;
    joinPiece(game);
  }
  return { ...game };
};

const getPiece = game => {
  game.piece = {
    form: {
      0: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
      1: [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
      2: [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
      3: [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
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
        case 65: {
          return rotateLeft(state);
        }
        case 83: {
          return rotateRight(state);
        }
        default:
          return state;
      }
    default:
      return state;
  }
}
