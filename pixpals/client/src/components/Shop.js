import React, { Component } from 'react';
import { indexItems, addInventory, setCurrency } from '../services/api_helper';

export default class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      currency: parseInt(localStorage.getItem('currency'))
    }
  }

  async componentDidMount() {
    const items = await indexItems();
    this.setState({ items });
  }

  buyItem = async (e, item) => {
    e.preventDefault();
    await this.setState({ currency: parseInt(localStorage.getItem('currency')) });
    if (this.state.currency - item.cost >= 0) {
      let currency = this.state.currency;
      currency = currency - item.cost;
      this.setState({ currency });
      const userId = localStorage.getItem('userId');
      await setCurrency(userId, currency);
      await addInventory({ item_id: item.id });
      alert("Purchase successful!");
    } else {
      alert("You can't afford that item!");
    }
    this.props.currencyRefresh();
  }

  render() {
    return (
      <div className="shop">
      {this.state.items && this.state.items.map(item => (
        <div className="shop-card" key={item.id}>
          <img className="shop-item" src={item.image} alt={item.name} />
          <p>{item.name}</p>
          <p className="price">{item.cost} Pixels</p>
          <button onClick={(e) => this.buyItem(e, item)}>Buy</button>
        </div>
      ))}
      </div>
    )
  }
}