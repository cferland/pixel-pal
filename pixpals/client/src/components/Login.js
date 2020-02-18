import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        {this.props.currentUser ? <Redirect to={`/profile/${this.props.currentUser.username}`} /> :
          <div className="user-form">
            {this.props.errorText && <p className="error">{this.props.errorText}</p>}
            <form onSubmit={(e) => this.props.handleLogin(e, this.state)}>
              <h2>Login</h2>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <button>Submit</button>
            </form>
          </div>}
        </div>
    )
  }
}
