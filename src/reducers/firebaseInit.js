import * as actionTypes from '../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type){
    case actionTypes.FIREBASE_CONFIG:
      return action.firebaseApp;
  }
  return state;
}
