import { combineReducers } from 'redux';
import api from './api';
import todo from './todo';

export default combineReducers({
  api,
  todo,
});
