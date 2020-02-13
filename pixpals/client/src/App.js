import React, { Component } from 'react';
import { registerUser, loginUser, verifyUser, postAvatar, loadAvatar } from './services/api_helper';
import { Route, Link, withRouter } from 'react-router-dom';

import './App.css';

import Register from './components/Register';
import Login from './components/Login';
import Avatar from './components/Avatar';
import Shop from './components/Shop';
import Inventory from './components/Inventory';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      currentUser: null,
      currentAvatar: null,
      errorText: ""
    }
  }

  handleRegister = async (e, registerData) => {
    e.preventDefault();
    const currentUser = await registerUser(registerData);
    const currentAvatar = await postAvatar({ base: "/images/bases/base_light.png", hair: "", outfit: "/images/outfits/casual_pink.png" });
    if (!currentUser.errorMessage) {
      this.setState({ currentUser, currentAvatar });
    } else {
      this.setState({ errorText: currentUser.errorMessage })
    }
  }

  handleLogin = async (e, loginData) => {
    e.preventDefault();
    const currentUser = await loginUser(loginData);
    console.log(currentUser)
    const currentAvatar = await loadAvatar(currentUser.id);
    this.setState({ currentUser, currentAvatar });
  }

  handleLogout = () => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('avatar_base');
    localStorage.removeItem('avatar_hair');
    localStorage.removeItem('avatar_outfit');
    localStorage.removeItem('avatar_id');
  }

  componentDidMount() {
    verifyUser();
    if (localStorage.getItem('authToken')) {
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
      const user = { username, email };
      const base = localStorage.getItem('avatar_base');
      const hair = localStorage.getItem('avatar_hair');
      const outfit = localStorage.getItem('avatar_outfit');
      const avatar = { base, hair, outfit };
      user && this.setState({
        currentUser: user,
        currentAvatar: avatar
      })
    }
  }

  render() {
    return (
      <div className="App">
        { this.state.currentUser ?
          <div>
            <Avatar currentAvatar={this.state.currentAvatar} />
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
        <Route path="/shop" render={() => (
          <Shop />
        )} />
        <Route path="/inventory" render={() => (
          <Inventory />
        )} />
      </div>
    );
  }
}

export default App;
