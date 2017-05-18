import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import styles from './styles.css';

function mapStateToProps(state, props) {
  console.log('steve', state);
  const { loggedInUser, oauthToken } = state.auth;
  const { requests } = state.github;
  return {
    loggedInUser,
    oauthToken,
    requests
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signInWithGithub: bindActionCreators(actions.signInWithGithub, dispatch),
    fetchPrs: bindActionCreators(actions.fetchPrs, dispatch)
  };
}

class App extends Component {
  renderHeader() {
    if (this.props.loggedInUser) {
      return (
        <div className={styles.loggedInHeader} />
      );
    } else {
      return (
        <div className={styles.notLoggedInHeader} />
      );
    }
  }

  renderFooter() {
    if (this.props.loggedInUser) {
      return (
        <div className={styles.loggedInFooter} />
      );
    } else {
      return (
        <div className={styles.notLoggedInFooter} />
      );
    }
  }

  renderBody() {
    if (!this.props.loggedInUser) {
      return (
          <div id="appContainer" className={styles.app}>
            <button
              className={styles.button}
              onClick={this.props.signInWithGithub}>
              Click to Sign In
            </button>
          </div>
      );
    }
    console.log('logged in with requests', this.props.requests);
    const myStr = `Signed in as ${this.props.loggedInUser.displayName}\n`;
    const pullRequests = this.props.requests && this.props.requests.map(request => request.number + '\n');
    return (
      <div id="appContainer" className={styles.app}>
        <p className={styles.text}>
          {myStr}
          {pullRequests || 'No PRs found'}
        </p>
      </div>
    );
  }

  componentDidUpdate() {
    const { loggedInUser, oauthToken, requests } = this.props;
    if (oauthToken && loggedInUser && !requests) {
      this.props.fetchPrs(oauthToken, loggedInUser);
    }
  }

  render() {
    console.log('in render of App with user', this.props);
    const header = this.renderHeader();
    const footer = this.renderFooter();
    const body = this.renderBody();
    return (
      <div>
        {header}
        {body}
        {footer}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
