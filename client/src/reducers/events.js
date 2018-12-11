import { CLIENT_HELLOWORLD } from '../types';

const initialState = {
  helloWorld: true,
};

export default function events(state = initialState, action = {}) {
  switch (action.type) {
    case CLIENT_HELLOWORLD:
      return {
        ...state,
        helloWorld: false,
      };
    default:
      return state;
  }
}
