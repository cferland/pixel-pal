import React, { Component } from 'react';
import { indexItems, addInventory } from '../services/api_helper';

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

  buyItem = async (e, item) => {
    e.preventDefault();
    await addInventory({ item_id: item.id });
  }

  render() {
    return (
    <div>
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