import React, { Component } from 'react';
import { loadInventory, verifyUser, loadItem, putAvatar, loadAvatar } from '../services/api_helper';

export default class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  async componentDidMount() {
    verifyUser();
    const inventory = await loadInventory();
    inventory.forEach(async inv => {
      const itemId = parseInt(inv.item_id);
      const item = await loadItem(itemId);
      this.setState({ items: [...this.state.items, item] });
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
  }

  render() {
    return (
      <div>
        {this.state.items.map((item, index) => (
          <div key={index}>
            <img className="inv-item" src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <button onClick={(e) => this.equipItem(e, item)}>Equip</button>
          </div>
        ))}
      </div>
    )
  }
}