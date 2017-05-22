import GitHub from 'github-api';
import { UPDATE_PR_LIST } from '../constants/actionTypes';

export function fetchPrs(oauthToken, loggedInUser) {
  return (dispatch, getState) => {
    if (!oauthToken) {
      return;
    }
    const github = new GitHub({ token: oauthToken });
    github.getUser().getProfile().then((user) => {
      const username = user && user.data && user.data.login;
      if (!username) {
        return;
      }
      const search = github.search();
      search.forIssues(
        {
          q: `author:${username} is:open is:pr`
        }
      ).then((results) => {
        console.log('searching got me', results);
        const requests = results.data && results.data.map(pr => {
          return { id: pr.id, number: pr.number };
        });
        dispatch({
          type: UPDATE_PR_LIST,
          requests
        });
      })
    });
  }
}
