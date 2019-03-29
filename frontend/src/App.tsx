import React, { Component } from 'react';
import LandingSection from './components/LandingSection';
import './scss/App.scss';
import RegisterSection from './components/RegisterSection';
import LoginSection from './components/LoginSection';
import { withCookies, Cookies } from 'react-cookie';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

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
    this.autoLogin()
  }

  async autoLogin() {
    const sessionId = this.props.cookies!!.get('JSESSIONID');
    console.log(sessionId);

    if (sessionId != undefined) {
      const response = await fetch(`/user_api/session/${sessionId}`, { credentials: 'include' });
      const body = await response.text();
      console.log("onDidMount: ", body);
      if (body === '') {
        this.setState(({ isAuthenticated: false }))
      } else {
        console.log(body);
        this.setState({ isAuthenticated: true, user: JSON.parse(body) })
      }
    }
  }

  render() {
    return (
      <div id="app">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={LandingSection} />
            <Route path='/register' render={(_props: RouteComponentProps) => <RegisterSection {...this.props} />} />
            <Route path='/login' render={(_props: RouteComponentProps) => <LoginSection {...this.props} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default withCookies(App);
