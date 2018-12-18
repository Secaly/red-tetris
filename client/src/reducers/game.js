import { CLIENT_HELLOWORLD, CLIENT_INPUT, SERVER_GETPIECE } from '../types';

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
  helloWorld: true,
};

const initialPiece = {
  form: [[0, 1, 0], [1, 1, 1]],
  pos: [0, 0],
};

const joinPiece = game => {
  game.boardFlex = game.boardFix.map(x => x.slice(0));
  game.piece.form.map((pieceLine, index) =>
    game.boardFlex[game.piece.pos[0] + index].splice(
      game.piece.pos[1],
      pieceLine.length,
      ...pieceLine,
    ),
  );
  return game.boardFlex;
};

const moveLeft = game => {
  if (game.piece.pos[1] > 0) {
    game.piece.pos[1] -= 1;
    return { ...game, board: joinPiece(game), piece: { ...game.piece } };
  }
  return game;
};

const moveRight = game => {
  if (game.piece.pos[1] < 10 - game.piece.form[0].length) {
    game.piece.pos[1] += 1;
    return { ...game, board: joinPiece(game), piece: { ...game.piece } };
  }
  return game;
};

const moveDown = game => {
  if (game.piece.pos[0] < 20 - game.piece.form.length) {
    game.piece.pos[0] += 1;
    return { ...game, board: joinPiece(game), piece: { ...game.piece } };
  }
  return game;
};

export default function game(state = initialState, action = {}) {
  switch (action.type) {
    case SERVER_GETPIECE:
      return {
        ...state,
        piece: initialPiece,
        boardFlex: joinPiece({ ...state, piece: initialPiece }),
      };
    case CLIENT_HELLOWORLD:
      return {
        ...state,
        helloWorld: !state.helloWorld,
      };
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
