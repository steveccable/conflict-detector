// var functions = require('firebase-functions');

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';

import configureStore from './stores/configureStore';
import { firebaseConfig } from './constants/firebaseConfig';
import * as actions from './actions';
import * as actionTypes from './constants/actionTypes';

import App from './components/App';

const store = configureStore();

const firebaseApp = firebase.initializeApp(firebaseConfig);
// Store the firebaseApp in redux state for use elsewhere
store.dispatch(actions.setFirebaseApp(firebaseApp));

const initPromise = new Promise((resolve, reject) => {
    // do some stuff
    console.log('initializing...');
    // store.dispatch(actions.signInWithGithub());
    // store.dispatch({
    //   type: actionTypes.AUTH_SAVE_GITHUB_TOKEN,
    //   oauthToken: 'testToken' // })
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (!sessionStorage.getItem('GITUB_TOKEN')) {
        // we only retrieve the github oauth token during login and only store it
        // in session, so if the user still has a firebaseSession but no github
        // oauth token, then we need to ask the user to log in again
        user = null;
      }
      if (!user) {
        resolve(null);
        return;
      }
      console.log('updating auth state');
      store.dispatch({
        type: actionTypes.AUTH_CHANGED,
        loggedInUser: user
      })
    })
    resolve();
});

initPromise.then(() => {
  console.log('rendering...');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
}).catch((error) => {
  console.error('uh-oh', error);
})
