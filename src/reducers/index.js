import { combineReducers } from 'redux';
import auth from './auth';
import firebaseInit from './firebaseInit';
import github from './github';

export default combineReducers({
  auth,
  firebaseInit,
  github
});
