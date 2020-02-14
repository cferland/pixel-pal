import React, { Component } from 'react';
import Avatar from './Avatar';
import { getAvatar, indexComments, postComment } from '../services/api_helper';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAvatar: null,
      comments: []
    }
  }

  setAvatar = async (id) => {
    const avatar = await getAvatar(id);
    const base = avatar.base;
    const hair = avatar.hair;
    const outfit = avatar.outfit;
    const currentAvatar = { base, hair, outfit }
    this.setState({ currentAvatar })
  }

  getComments = async (id) => {
    const comments = await indexComments(id);
    this.setState({ comments });
  }

  createComment = async (content) => {
    const newComment = await postComment(content);
    this.setState({
      comments: [...this.state.comments, newComment]
    })
  }

  componentDidMount() {
    this.setAvatar(this.props.profileId);
    this.indexComments(this.props.profileId);
  }

  render() {
    return (
      <div>
        <div className="profile-avatar">
          {this.state.currentAvatar &&
            <Avatar currentAvatar={this.state.currentAvatar} />
          }
        </div>
        <div className="comments">
          {this.state.comments && this.state.comments.map(comment => {
            <div key={comment.id}>
              <h4>{comment.created_by}</h4>
              <p>{comment.content}</p>
            </div>
          })}
        </div>
        <div>
          
        </div>
      </div>
    )
  }
}