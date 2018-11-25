import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavTabs from "./components/NavTabs";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Survey from "./components/pages/Survey";
import SignUp from "./components/pages/SignUp";
import Main from "./components/pages/Main";
import Link from "./components/pages/Link";
import MakeLink from "./components/pages/MakeLink";
import inbox from "./components/pages/Inbox";
import Message from "./components/pages/message";
import HomePage from './components/pages/HomePage'
import DashboardPage from './components/pages/DashboardPage';
import LoginPage from './components/pages/LoginPage'
import Authentication from './components/Authentication'
import Inbox from './components/pages/Inbox'
import Auth from './utils/auth';
import Send from "./components/pages/Send";
import Forum from "./components/pages/Forum";
import './uikit/uikit.css';
import './App.css';
import Mail from "./components/pages/Mail.js";


class App extends Component {
  state = {
    token: Auth.getToken()
  }

  componentDidMount() {
    Auth.onAuthChange(this.handleAuthChange)
    console.log("test", this.state.token)
  }

  handleAuthChange = token => {
    this.setState({
      token
    })
  }
  render() {
    return (
      <Router>
        <div>
          <header>
            <Authentication token={this.state.token} />
          </header>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" render={() => <LoginPage token={this.state.token} />} />
          <PrivateRoute path="/dashboard" component={DashboardPage} token={this.state.token} />

          <NavTabs token={this.state.token}/>
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Survey" component={Survey} />
          <Route exact path="/SignUp"  render = {(routeProps) => (<SignUp {...routeProps} token = {this.state.token}/>)}
            />
          <Route exact path="/Main" component={Main} />
          <Route exact path="/Inbox"
            render = {(routeProps) => (<Inbox {...routeProps} token = {this.state.token}/>)}
            />
          <Route exact path="/Link" component={Link} />
          <Route exact path="/Forum" component={Forum} />
          <Route exact path="/Link" component={Link} />
          <Route exact path="/MakeLink" component={MakeLink} />
          <Route exact path="/Message" component={Message} />
          <Route exact path="/Send" component={Send} />
          <Route path="/Mail"
            render = {(routeProps) => (<Mail {...routeProps} token = {this.state.token}/>)}
            />
          <Route path="/Inbox" component={inbox} />
         
        </div>
      </Router>
    )
  }
};
const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route {...rest} render={props => (
    token ? (
      <Component {...props} token={token} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)
export default App;
