import React from 'react'
import { useState } from 'react';
import { updateQuantity } from '../../state/services/inventory-service';
import { InputControl } from '../Forms/FormControl';
import './InventoryItem.css';

export default function InventoryItem({item}) {
  const [quantity, setQuantity] = useState(item.quantity);
  const handleQuantity = ({ target }) => setQuantity(target.value);
  let [editing, setEditing] = useState(false);

  function toggleEdit(){
    setEditing(!editing);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateQuantity(quantity, item.inventoryId);
    toggleEdit();
  };

  return (
    <li className='item'>
      {/* if "editing" is true, show a form letting you input a quantity number
        pressing enter submits that quantity and makes "editing" false
        if it's false, show a button to start editing
        "editing" defaults false*/}
      Quantity: <b>{editing ?
    <form className='inventoryAddForm' onSubmit={handleSubmit}>
      <InputControl
        type={'number'}
        label={'quantity'}
        value={quantity}
        onChange={handleQuantity}
      />
    </form>
      : item.quantity}</b> units
      {/* edit button is separate down here but in the same logic */}
      {editing ? null : <button className='quantityButton' onClick={toggleEdit}>+-</button>}
      <div>
        Item: {item.itemname}
      </div>
      <div>
        Category: {item.Categories.category_name}
      </div>
      <div>
        Total Cost:${item.cost * item.quantity}
      </div>
    </li>
  )
}
