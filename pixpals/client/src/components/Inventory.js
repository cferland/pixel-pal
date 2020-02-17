import React, { Component } from 'react';
import { loadInventory, verifyUser, loadItem, putAvatar, loadAvatar, deleteInventory, setCurrency } from '../services/api_helper';

export default class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      currency: parseInt(localStorage.getItem('currency'))
    }
  }

  async componentDidMount() {
    verifyUser();
    const inventory = await loadInventory();
    inventory.forEach(async inv => {
      const invId = parseInt(inv.id);
      const itemId = parseInt(inv.item_id);
      const item = await loadItem(itemId);
      const invItem = { ...item, invId };
      this.setState({ items: [...this.state.items, invItem] });
    })
  }

  equipItem = async (e, item) => {
    e.preventDefault();
    const avatarId = localStorage.getItem('avatar_id');
    console.log(item);
    if (item.image.search('/outfits/') !== -1) {
      const itemData = { outfit: item.image }
      await putAvatar(avatarId, itemData);
      await loadAvatar(avatarId);
    } else if (item.image.search('/hairstyles/') !== -1) {
      const itemData = { hair: item.image }
      await putAvatar(avatarId, itemData);
      await loadAvatar(avatarId);
    } else if (item.image.search('/bases/') !== -1) {
      const itemData = { base: item.image }
      await putAvatar(avatarId, itemData);
      await loadAvatar(avatarId);
    }
    this.props.avatarRefresh();
  }

  sellItem = async (e, item) => {
    e.preventDefault();
    const outfit = localStorage.getItem('avatar_outfit');
    const hair = localStorage.getItem('avatar_hair');
    const base = localStorage.getItem('avatar_base');
    if (item.image === outfit || item.image === hair || item.image === base) {
      alert('You cannot sell an item that your pixel pal is currently wearing!');
    } else {
      let currency = this.state.currency;
      currency = currency + item.cost;
      this.setState({ currency });
      const userId = localStorage.getItem('userId');
      await setCurrency(userId, currency);
      await deleteInventory(item.invId);
      this.setState({ items: [] });
      const inventory = await loadInventory();
      inventory.forEach(async inv => {
        const invId = parseInt(inv.id);
        const itemId = parseInt(inv.item_id);
        const item = await loadItem(itemId);
        const invItem = { ...item, invId };
        this.setState({ items: [...this.state.items, invItem] });
      })
    }
  }

  render() {
    return (
      <div className="inventory">
        {this.state.items.map((item) => (
          <div className="inv-card" key={item.invId}>
            <img className="inv-item" src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <button onClick={(e) => this.equipItem(e, item)}>Equip</button>
            <button onClick={(e) => this.sellItem(e, item)}>Sell</button>
          </div>
        ))}
      </div>
    )
  }
}