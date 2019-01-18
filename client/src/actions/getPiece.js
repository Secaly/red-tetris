import { SERVER_GETPIECE } from '../types';

const getPiece = (gameName, playerName, board) => ({
  type: SERVER_GETPIECE,
  gameName,
  playerName,
  board,
});

export default getPiece;
