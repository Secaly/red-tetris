import { combineReducers } from 'redux';

import events from './reducers/events';
import inputs from './reducers/inputs';

export default combineReducers({
  events,
  inputs,
});
