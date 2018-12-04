import { SERVER_PING } from '../types';

const ping = () => ({
  type: SERVER_PING,
});

export default ping;
