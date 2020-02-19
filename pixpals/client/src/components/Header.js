import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { setCurrency } from '../services/api_helper';

import Avatar from './Avatar';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moneybag: null
    }
  }

  findPixels = async () => {
    let amount = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
    const currency = this.props.currency + amount;
    const userId = localStorage.getItem('userId');
    alert(`You found ${amount} Pixels!`);
    await setCurrency(userId, currency);
    await this.props.currencyRefresh();
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
            <h4 onClick={this.findPixels}>{this.props.currency} Pixels</h4>
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