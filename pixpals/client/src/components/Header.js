import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';

export default class Header extends Component{
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <header>
        <Avatar currentAvatar={this.props.currentAvatar} />
      </header>
    )
  }
}