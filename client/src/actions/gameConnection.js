import { SERVER_JOINGAME, SERVER_LEAVEGAME } from '../types';

const gameConnection = (gameName, action) => {
  switch (action) {
    case 'join':
      return { type: SERVER_JOINGAME, gameName };
    case 'leave':
      return { type: SERVER_LEAVEGAME, gameName };
    default:
      return;
  }
};
export default gameConnection;
