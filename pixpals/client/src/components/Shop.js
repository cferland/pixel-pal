import React, { Component } from 'react';
import { indexItems } from '../services/api_helper';

export default class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  async componentDidMount() {
    const items = await indexItems();
    this.setState({ items });
  }

  render() {
    return (
    <div>
      {this.state.items && this.state.items.map(item => (
        <div key={item.id}>
          <img className="shop-item" src={item.image} alt={item.name} />
          <p>{item.name}</p>
          <p>{item.cost}</p>
        </div>
      ))}
      </div>
    )
  }
}