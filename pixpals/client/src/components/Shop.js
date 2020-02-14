import React, { Component } from 'react';
import { indexItems, addInventory, setCurrency } from '../services/api_helper';

export default class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      currency: localStorage.getItem('currency')
    }
  }

  async componentDidMount() {
    const items = await indexItems();
    this.setState({ items });
  }

  buyItem = async (e, item) => {
    e.preventDefault();
    if (this.state.currency - item.cost >= 0) {
      let currency = this.state.currency;
      currency = currency - item.cost;
      this.setState({ currency });
      const userId = localStorage.getItem('userId');
      await setCurrency(userId, currency);
      await addInventory({ item_id: item.id });
    } else {
      alert("You can't afford that item!");
    }
  }

  render() {
    return (
      <div>
        <p>{this.state.currency}</p>
      {this.state.items && this.state.items.map(item => (
        <div key={item.id}>
          <img className="shop-item" src={item.image} alt={item.name} />
          <p>{item.name}</p>
          <p>{item.cost}</p>
          <button onClick={(e) => this.buyItem(e, item)}>Buy</button>
        </div>
      ))}
      </div>
    )
  }
}