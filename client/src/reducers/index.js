import { combineReducers } from 'redux';
import api from './api';
import todo from './todo';
import screen from './screen';
import authenticate from './authenticate';

export default combineReducers({
  api,
  todo,
  screen,
  authenticate,
});
