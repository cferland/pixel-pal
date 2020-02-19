import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { setCurrency } from '../services/api_helper';

import Avatar from './Avatar';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moneybag: false
    }
  }

  findPixels = async () => {
    let amount = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
    const currency = this.props.currency + amount;
    const userId = localStorage.getItem('userId');
    alert(`You found ${amount} Pixels!`);
    await setCurrency(userId, currency);
    await this.props.currencyRefresh();
    this.setState({ moneybag: false });
  }

  generatePixels = () => {
    let randomize = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    if (randomize > 5) {
      this.setState({moneybag: true})
    } else {
      this.setState({moneybag: false})
    }
  }

  componentDidMount() {
    this.setState({ moneybag: false})
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
            <h4>{this.props.currency} Pixels</h4>
            {this.state.moneybag && <div className="moneybag" onClick={this.findPixels}><img src="/images/moneybag.png" alt="moneybag" /></div>}
          </div>
        </div>
        <nav>
          <div onClick={this.generatePixels}><Link to="/gallery">Gallery</Link></div>
          <div onClick={this.generatePixels}><Link to="/shop">Shop</Link></div>
          <div onClick={this.generatePixels}><Link to="/inventory">Inventory</Link></div>
        </nav>
      </header>
    )
  }
}