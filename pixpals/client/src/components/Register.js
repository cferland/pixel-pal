import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: ""
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        {this.props.currentUser ? <Redirect to="/" /> :
          <div className="user-form">
            {this.props.errorText && <p className="error">{this.props.errorText}</p>}
            <form onSubmit={(e) => this.props.handleRegister(e, this.state)}>
              <h2>Register</h2>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
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
