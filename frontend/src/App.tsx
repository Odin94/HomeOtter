import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    message: null
  }

  componentDidMount() {
    // Make a GET-request to our backend
    fetch('/api/hello')
      // Map the result to a JSON-object
      .then(response => response.json())
      // Put the message in the state
      .then(response => {
        this.setState({ message: response.message })
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Message from backend: {this.state.message}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
