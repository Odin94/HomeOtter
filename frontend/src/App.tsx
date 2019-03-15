import React, { Component } from 'react';
import LandingSection from './components/LandingSection';
import './scss/App.scss';
import RegisterSection from './components/RegisterSection';
import LoginSection from './components/LoginSection';
import { Cookies } from 'react-cookie';
import { withCookies } from 'react-cookie';

interface AppProps {
  cookies?: Cookies
}
interface AppState {
  csrfToken: string,
  isAuthenticated: boolean,
  user: any | undefined
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const { cookies } = props;

    this.state = {
      csrfToken: cookies!!.get('XSRF-TOKEN'),
      isAuthenticated: false,
      user: undefined
    };

    console.log(this.state.csrfToken);
  }

  async componentDidMount() {
    // const response = await fetch('/api/user', { credentials: 'include' });
    // const body = await response.text();
    // if (body === '') {
    //   this.setState(({ isAuthenticated: false }))
    // } else {
    //   console.log(body);
    //   this.setState({ isAuthenticated: true, user: JSON.parse(body) })
    // }
  }

  render() {
    return (
      <div id="app">
        <LandingSection />
        <RegisterSection csrfToken={this.state.csrfToken} />
        <LoginSection csrfToken={this.state.csrfToken} />
      </div>
    );
  }
}

export default withCookies(App);
