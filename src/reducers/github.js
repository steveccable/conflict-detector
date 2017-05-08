import * as actionTypes from '../constants/actionTypes';

const initialState = {
  loggedInUser: null,
  oauthToken: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case actionTypes.UPDATE_PR_LIST:
      return updatePrList(state, action);
  }
  return state;
}

function updatePrList(state, action) {
  const { requests } = action;
  return { ...state, requests };
}
