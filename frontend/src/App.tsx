import React, { Component } from 'react';
import logo from './logo.svg';
import LandingSection from './components/LandingSection';
import './scss/App.scss';

class App extends Component {
  state = {
    message: null
  }

  componentDidMount() {
    // // Make a GET-request to our backend
    // fetch('/api/hello')
    //   // Map the result to a JSON-object
    //   .then(response => response.json())
    //   // Put the message in the state
    //   .then(response => {
    //     this.setState({ message: response.message })
    //   })
  }

  render() {
    return (
      <div id="app">
        <LandingSection />
      </div>
    );
  }
}

export default App;
