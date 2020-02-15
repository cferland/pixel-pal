import React, { Component } from 'react';
import Avatar from './Avatar';
import Comment from './Comment';

import { getAvatar, indexComments, postComment, verifyUser, getUser } from '../services/api_helper';
import { Link } from 'react-router-dom';

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
    const avId = avatar.id;
    const currentAvatar = { base, hair, outfit, avId }
    this.setState({ currentAvatar })
  }

  getComments = async (id) => {
    const comments = await indexComments(id);
    this.setState({ comments });
  }

  createComment = async (content) => {
    const newComment = await postComment(this.state.currentAvatar.avId, content);
    this.setState({
      comments: [...this.state.comments, newComment]
    })
  }

  componentDidMount = async () => {
    verifyUser();
    const profileId = await getUser(this.props.profileId);
    console.log(profileId)
    this.setAvatar(profileId);
    this.getComments(profileId);
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.profileId !== this.props.profileId) {
      verifyUser();
      const profileId = await getUser(this.props.profileId);
      console.log(profileId)
      this.setAvatar(profileId);
      this.getComments(profileId);
    }
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
          {this.state.comments && this.state.comments.map(comment => (
            <div key={comment.id}>
              <h4><Link to={`/profile/${comment.created_by}`}>{comment.created_by}</Link></h4>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
        <div>
          <Comment createComment={this.createComment} />
        </div>
      </div>
    )
  }
}