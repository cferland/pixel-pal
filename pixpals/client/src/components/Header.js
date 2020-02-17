import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: parseInt(localStorage.getItem('currency'))
    }
  }

  getCurrency() {
    this.setState({
      currency: parseInt(localStorage.getItem('currency'))
    })
  }

  componentDidMount() {

  }


  render() {
    return (
      <header>
        <div className="container">
          <div className="user-box">
            <Avatar currentAvatar={this.props.currentAvatar} />
          </div>
          <div className="stats">
            <Link to={`/profile/${this.props.currentUser.username}`}><h2>{this.props.currentUser.username}</h2></Link>
            <h4>{this.state.currency} Pixels</h4>
          </div>
        </div>
        <nav>
          <div><Link to="/gallery">Gallery</Link></div>
          <div><Link to="/shop">Shop</Link></div>
          <div><Link to="/inventory">Inventory</Link></div>
        </nav>
      </header>
    )
  }
}