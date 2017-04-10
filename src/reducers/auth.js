import * as actionTypes from '../constants/actionTypes';

const initialState = {
  loggedInUser: null,
  oauthToken: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case actionTypes.AUTH_SAVE_GITHUB_TOKEN:
      return saveToken(state, action);
  }
  return state;
}

function saveToken(state, action) {
  const { oauthToken } = action;
  console.log('pretend I was saving the token', oauthToken);
  return { ...state, oauthToken };
}
