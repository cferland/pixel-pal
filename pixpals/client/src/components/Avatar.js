import React, { Component } from 'react';

export default class Avatar extends Component{
  constructor(props) {
    super(props);

    this.state = {
      base: '',
      hair: '',
      outfit: ''
    }
  }

  render() {
    return (
      <div>
        <div className="avatar">
          <img className="avatar-base" src={this.props.currentAvatar.base} alt="avatar" />
          {this.props.currentAvatar.outfit &&
            <img className="avatar-outfit" src={this.props.currentAvatar.outfit} alt="avatar" />
          }
          {this.props.currentAvatar.hair &&
            <img className="avatar-hair" src={this.props.currentAvatar.hair} alt="avatar" />
          }
        </div>
      </div>
    )
  }
}