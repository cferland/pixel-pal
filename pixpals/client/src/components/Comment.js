import React, { Component } from 'react';

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
      <form className="comment" onSubmit={(e) => {
        e.preventDefault();
        this.props.createComment(this.state);
        this.setState({ content: '' });
      }}>
        <input
          type="text"
          name="content"
          value={this.state.content}
          onChange={this.handleChange}
          placeholder="Enter a comment"
        />
        <button>Submit</button>
      </form>
    )
  }
}