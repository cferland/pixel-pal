import React, { Component } from 'react';
import { verifyUser } from '../services/api_helper';

export default class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  render() {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.props.createComment(this.state)
      }}>
        <label htmlFor="content">Comment</label>
        <input
          type="text"
          name="content"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    )
  }
}