import * as actionTypes from '../constants/actionTypes';

const initialState = {
  loggedInUser: null,
  oauthToken: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case actionTypes.AUTH_SAVE_GITHUB_TOKEN:
      return saveToken(state, action);
    case actionTypes.AUTH_CHANGED:
      return updateAuth(state, action);
  }
  return state;
}

function saveToken(state, action) {
  const { oauthToken } = action;
  console.log('pretend I was saving the token', oauthToken);
  return { ...state, oauthToken };
}

function updateAuth(state, action){
  const { loggedInUser } = action;
  // the token gets saved to state and sessionStorage in saveToken during login flow
  // let oauthToken = state.oauthToken ? state.oauthToken : sessionStorage.getItem('GITUB_TOKEN');
  // if (!loggedInUser){
  //   oauthToken = null;
  // }
  return { ...state, loggedInUser };
}
