import React, { Component } from 'react';
import { indexAvatars } from '../services/api_helper';

import Avatar from './Avatar';

export default class Gallery extends Component{
  constructor(props) {
    super(props);

    this.state = {
      avatars: []
    }
  }

  getAvatars = async () => {
    const avatars = await indexAvatars();
    this.setState({ avatars });
  }

  componentDidMount() {
    this.getAvatars();
  }

  render() {
    return (
      <div>
        <div className="gallery">
          {this.state.avatars.length && this.state.avatars.map(avatar => (
            <div key={avatar.id}>
              <Avatar currentAvatar={avatar} />
              <h3>{avatar.user_id}</h3>
            </div>
          ))}
        </div>
      </div>
    )
  }
}