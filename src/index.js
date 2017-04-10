// var functions = require('firebase-functions');

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

import React from 'react';
import ReactDOM from 'react-dom';
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
    store.dispatch(actions.signInWithGithub());
    store.dispatch({
      type: actionTypes.AUTH_SAVE_GITHUB_TOKEN,
      oauthToken: 'testToken'
    })
    resolve();
});

initPromise.then(() => {
  console.log('rendering...');
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
}).catch((error) => {
  console.error('uh-oh', error);
})
