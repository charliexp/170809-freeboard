import { combineReducers } from 'redux';
import board from './board';
import fake from './fake';

export default combineReducers({
  board,
  fake
});
