import { CLIENT_INPUT } from '../types';

export default function inputs(state = { input: 'nothing' }, action = {}) {
  switch (action.type) {
    case CLIENT_INPUT:
      return {
        ...state,
        input: action.input,
      };
    default:
      return state;
  }
}
