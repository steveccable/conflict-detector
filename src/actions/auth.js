import * as actionTypes from '../constants/actionTypes';
import * as firebase from 'firebase';

function getFirebaseAuth(state){
  var firebaseApp = state.firebaseInit;
  return firebaseApp.auth();
}

export function signInWithGithub() {
  console.log('attempting github signin');
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope('repo');
  return (dispatch, getState) => {
    var firebaseAuth = getFirebaseAuth(getState());
    // if (browsercheckActions.isFirefox()){
    //   // User will be redirected to Github to sign in.
    //   // When they return, the initializationPromise() inside /index.js
    //   // Will get the redirect result (https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#getRedirectResult)
    //   firebaseAuth.signInWithRedirect(provider);
    // } else {
      // Browser will display a popup in which the user can sign in
      // Popup will close upon authentication and flow will continue here
      firebaseAuth.signInWithPopup(provider).then(function(result){
        console.info("Signed in after popup at "+new Date());
        var oauthToken = result.credential.accessToken;
        dispatch({
          type: actionTypes.AUTH_SAVE_GITHUB_TOKEN,
          oauthToken: oauthToken
        });
      }).catch(function(error) {
        console.warn("Error logging into Github via popup", error);
      });
    // }
  }
}

export function signOutOfGithub() {
  return (dispatch, getState) => {
    const firebaseAuth = getFirebaseAuth(getState());
    firebaseAuth.signOut().then(() => {
      dispatch({
        type: actionTypes.AUTH_CHANGED,
        loggedInUser: null
      });
    });
  }
}
