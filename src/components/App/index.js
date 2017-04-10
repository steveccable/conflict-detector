import React, { Component } from 'react';
import styles from './styles.css';

class App extends Component {
  render() {
    console.log('in render of App');
    return (
      <div id="appContainer" className={styles.app}>
        <p className={styles.text}>This is the app</p>
      </div>
    );
  }
}

export default App;
