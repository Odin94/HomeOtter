import React, { Component } from 'react';
import LandingSection from './components/LandingSection';
import './scss/App.scss';
import RegisterSection from './components/RegisterSection';
import LoginSection from './components/LoginSection';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import User from './models/User';


interface AppProps {
}
interface AppState {
  csrfToken: string,
  isAuthenticated: boolean,
  user?: User
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      csrfToken: Cookies.get('XSRF-TOKEN')!!,
      isAuthenticated: false,
      user: undefined
    };

    console.log(`csrf token: ${this.state.csrfToken}`);
  }

  async componentDidMount() {
    this.getUser()
  }

  async getUser() {
    const sessionId = Cookies.get('JSESSIONID');
    console.log(`sessionId: ${sessionId}`);
    console.log(Cookies.get());

    if (sessionId != undefined) {
      const response = await fetch(`/user_api/session/${sessionId}`,
        {
          method: "POST",
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-XSRF-TOKEN': this.state.csrfToken
          }
        });
      const body = await response.text();
      console.log("onDidMount: ", body);
      if (body === '') {
        this.setState(({ isAuthenticated: false }))
      } else {
        console.log(`sessionBody: `, body);
        this.setState({ isAuthenticated: true, user: JSON.parse(body) })
      }
    }
  }

  render() {
    console.log("user: ", this.state.user);
    return (
      <div id="app">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={(_props: RouteComponentProps) => <LandingSection user={this.state.user} />} />
            <Route path='/register' render={
              (_props: RouteComponentProps) => {
                return (<div className="section-wrapper">
                  <LandingSection user={this.state.user} />
                  <RegisterSection {...this.props} />
                </div>);
              }} />
            <Route path='/login' render={
              (_props: RouteComponentProps) => {
                return (<div className="section-wrapper">
                  <LandingSection user={this.state.user} />
                  <LoginSection {...this.props} />
                </div>);
              }} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
