import React, { Component } from 'react';
import logo from './logo.svg';
import HeaderMenu from './components/HeaderMenu';
import './App.css';
import Layout from 'antd/lib/layout';

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
      <Layout className="App">
        <HeaderMenu />
        {/* <Main /> */}
      </Layout>
    );
  }
}

export default App;
