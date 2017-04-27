import { combineReducers } from 'redux';
import auth from './auth';
import firebaseInit from './firebaseInit';

export default combineReducers({
  auth,
  firebaseInit
});
