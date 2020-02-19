import React, { Component } from 'react';
import Avatar from './Avatar';
import Comment from './Comment';

import { getAvatar, indexComments, postComment, verifyUser, getUser, setCurrency, deleteComment } from '../services/api_helper';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAvatar: null,
      comments: [],
      currency: parseInt(localStorage.getItem('currency'))
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
    console.log(this.state.currentAvatar)
  }

  getComments = async (id) => {
    const comments = await indexComments(id);
    this.setState({ comments });
  }

  createComment = async (content) => {
    const newComment = await postComment(this.state.currentAvatar.avId, content);
    let currency = this.state.currency;
    let length = content.content.length;
    let addAmount = Math.floor(Math.random() * (length - 1 + 1)) + 1;
    console.log(addAmount);
    currency = currency + addAmount;
    this.setState({ currency });
    const userId = localStorage.getItem('userId');
    await setCurrency(userId, currency);
    this.setState({
      comments: [...this.state.comments, newComment]
    })
    this.props.currencyRefresh();
  }

  deleteComment = async (e, avId, commentId) => {
    e.preventDefault();
    await deleteComment(avId, commentId);
    this.getComments(avId);
  }

  componentDidMount = async () => {
    verifyUser();
    const profileId = await getUser(this.props.profileId);
    await this.setAvatar(profileId);
    await this.getComments(profileId);
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.profileId !== this.props.profileId) {
      verifyUser();
      const profileId = await getUser(this.props.profileId);
      this.setAvatar(profileId);
      this.getComments(profileId);
    }
  }

  render() {
    return (
      <div className="profile">
        <div>
          <h1>{this.props.profileId}</h1>
          <div className="profile-avatar">
            {this.state.currentAvatar &&
              <Avatar currentAvatar={this.state.currentAvatar} />
            }
          </div>
        </div>
        <div className="comments">
          <h2>Comments</h2>
          {this.state.comments && this.state.comments.map(comment => (
            <div key={comment.id}>
              <h4><Link to={`/profile/${comment.created_by}`}>{comment.created_by}</Link></h4>
              <p>{comment.content}</p>
              {comment.created_by === localStorage.getItem('username') || this.state.currentAvatar.avId === parseInt(localStorage.getItem('userId')) ?
                (
                  <button className="sell" onClick={(e) => this.deleteComment(e, this.state.currentAvatar.avId, comment.id)}>
                    Delete
                  </button>
                ) : ''}
            </div>
          ))}
          <div>
            {this.props.currentUser &&
              <Comment createComment={this.createComment} />
            }
          </div>
        </div>
      </div>
    )
  }
}