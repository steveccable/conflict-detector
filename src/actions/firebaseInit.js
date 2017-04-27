import * as actionTypes from '../constants/actionTypes';

export function setFirebaseApp(app) {
  console.log('setting firebase', app);
  return {
    type: actionTypes.FIREBASE_CONFIG,
    firebaseApp: app
  }
}
