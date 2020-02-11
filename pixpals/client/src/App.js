import React, { Component } from 'react';
import { registerUser, loginUser, verifyUser } from './services/api_helper';
import { Route, Link, withRouter } from 'react-router-dom';

import './App.css';

import Register from './components/Register';
import Login from './components/Login';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      currentUser: null,
      errorText: ""
    }
  }

  handleRegister = async (e, registerData) => {
    e.preventDefault();
    const currentUser = await registerUser(registerData);
    if (!currentUser.errorMessage) {
      this.setState({ currentUser });
    } else {
      this.setState({ errorText: currentUser.errorMessage })
    }
  }

  handleLogin = async (e, loginData) => {
    e.preventDefault();
    const currentUser = await loginUser(loginData);
    this.setState({ currentUser });
  }

  handleLogout = () => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }

  componentDidMount() {
    verifyUser();
    if (localStorage.getItem('authToken')) {
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
      const user = { username, email };
      user && this.setState({
        currentUser: user
      })
    }
  }

  render() {
    return (
      <div className="App">
        { this.state.currentUser ?
          <div>
            <h1>Hello, {this.state.currentUser.username}</h1>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
          :
            <nav>
              <Link to="/register"><button>Register</button></Link>
              <Link to="/login"><button>Login</button></Link>
            </nav>
        }
        <Route path="/login" render={() => (
          <Login
            handleLogin={this.handleLogin}
          />
        )} />
        <Route path="/register" render={() => (
          <Register
            handleRegister={this.handleRegister}
            errorText={this.state.errorText}
          />
        )} />
      </div>
    );
  }
}

export default App;
