import _ from 'lodash';
import {
  CLIENT_INPUT,
  CLIENT_FALLPIECE,
  CLIENT_STARTGAME,
  SERVER_SENDPIECE,
  SERVER_SENDGAMEUPDATE,
} from '../types';

const initialState = {
  otherPlayers: [
    {
      name: 'NO PLAYER',
      board: [
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
    },
    {
      name: 'NO PLAYER',
      board: [
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
    },
    {
      name: 'NO PLAYER',
      board: [
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
    },

    {
      name: 'NO PLAYER',
      board: [
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
    },
  ],
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
  gameStatus: 'waiting',
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
    case 'spawn':
      return !game.piece.form[game.piece.rotation].some((line, lineIndex) =>
        line.some(
          (cell, cellIndex) =>
            cell > 0 &&
            ((game.piece.pos[0] + lineIndex < 20 &&
              game.boardFix[game.piece.pos[0] + lineIndex][
                game.piece.pos[1] + cellIndex
              ] > 0) ||
              game.piece.pos[0] + lineIndex === 20),
        ),
      );
    case 'left':
      return !game.piece.form[game.piece.rotation].some((line, lineIndex) =>
        line.some(
          (cell, cellIndex) =>
            cell > 0 &&
            ((game.piece.pos[1] + cellIndex - 1 >= 0 &&
              game.boardFix[game.piece.pos[0] + lineIndex][
                game.piece.pos[1] + cellIndex - 1
              ] > 0) ||
              game.piece.pos[1] + cellIndex - 1 < 0),
        ),
      );
    case 'right':
      return !game.piece.form[game.piece.rotation].some((line, lineIndex) =>
        line.some(
          (cell, cellIndex) =>
            cell > 0 &&
            ((game.piece.pos[1] + cellIndex + 1 < 10 &&
              game.boardFix[game.piece.pos[0] + lineIndex][
                game.piece.pos[1] + cellIndex + 1
              ] > 0) ||
              game.piece.pos[1] + cellIndex + 1 === 10),
        ),
      );
    case 'down':
      return !game.piece.form[game.piece.rotation].some((line, lineIndex) =>
        line.some(
          (cell, cellIndex) =>
            cell > 0 &&
            ((game.piece.pos[0] + lineIndex + 1 < 20 &&
              game.boardFix[game.piece.pos[0] + lineIndex + 1][
                game.piece.pos[1] + cellIndex
              ] > 0) ||
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
    if (line.every(cell => cell > 0)) {
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
        (cell > 0 &&
          game.boardFix[game.piece.pos[0] + lineIndex][
            game.piece.pos[1] + cellIndex
          ] > 0) ||
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

const getPiece = (game, piece) => {
  game.piece = piece;
  if (isFree(game, 'spawn')) {
    joinPiece(game);
  } else {
    game.gameStatus = 'over';
    game.boardFlex = [
      [0, 1, 1, 1, 1, 0, 4, 4, 4, 0],
      [1, 0, 0, 0, 0, 4, 0, 0, 0, 4],
      [1, 0, 1, 1, 1, 4, 0, 0, 0, 4],
      [1, 0, 0, 0, 1, 4, 0, 0, 0, 4],
      [0, 1, 1, 1, 0, 0, 4, 4, 4, 0],
      [0, 2, 2, 2, 0, 3, 0, 0, 0, 3],
      [2, 0, 0, 0, 2, 3, 0, 0, 0, 3],
      [2, 2, 2, 2, 2, 3, 0, 0, 0, 3],
      [2, 0, 0, 0, 2, 0, 3, 0, 3, 0],
      [2, 0, 0, 0, 2, 0, 0, 3, 0, 0],
      [0, 3, 0, 3, 0, 2, 2, 2, 2, 2],
      [3, 0, 3, 0, 3, 2, 0, 0, 0, 0],
      [3, 0, 3, 0, 3, 2, 2, 2, 2, 0],
      [3, 0, 0, 0, 3, 2, 0, 0, 0, 0],
      [3, 0, 0, 0, 3, 2, 2, 2, 2, 2],
      [4, 4, 4, 4, 4, 1, 1, 1, 1, 0],
      [4, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [4, 4, 4, 4, 0, 1, 1, 1, 1, 0],
      [4, 0, 0, 0, 0, 1, 0, 0, 1, 0],
      [4, 4, 4, 4, 4, 1, 0, 0, 0, 1],
    ];
  }
  return { ...game };
};

const getUpdate = (game, playerName, board) => {
  console.log(playerName, board);
  game.otherPlayers[0].name = playerName;
  game.otherPlayers[0].board = board.map(x => x.slice(0));
  return { ...game };
};

const startGame = () => ({
  otherPlayers: [
    {
      name: '',
      board: [
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
    },
  ],
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
  gameStatus: 'start',
});

export default function game(state = initialState, action = {}) {
  switch (action.type) {
    case SERVER_SENDGAMEUPDATE:
      return getUpdate(state, action.data.playerName, action.data.board);
    case SERVER_SENDPIECE:
      return getPiece(state, action.data);
    case CLIENT_STARTGAME:
      return startGame();
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
