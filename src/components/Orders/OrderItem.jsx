import React from 'react'
import { useState } from 'react';
import { removeOrder, updateOrder } from '../../state/services/order-service';
import { InputControl } from '../Forms/FormControl';
import './OrderItem.css';

export default function OrderItem({order}) {
  const [quantity, setQuantity] = useState(0);
  const orderLeft = order.orderquantity - order.completed;
  const handleQuantity = ({ target }) => setQuantity(target.value);
  let [editing, setEditing] = useState(false);

  function toggleEdit(){
    setEditing(!editing);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ordered = await updateOrder(quantity, order.id, order.completed);
    if (ordered.completed === ordered.orderquantity) {
      await removeOrder(order.id);
      alert('Item ' + order.label + ' finished. Removing from database.')
    }
    toggleEdit();
  };

  return (
    <li className='order'>
      Remaining: <b>{editing ?
    <form className='orderAddForm' onSubmit={handleSubmit}>
      <InputControl
        max={orderLeft}
        min={-orderLeft}
        type={'number'}
        label={'units to remove'}
        value={quantity}
        onChange={handleQuantity}
      />
    </form>
      : order.orderquantity - order.completed}</b> units
      {editing ? null : <button className='quantityButton' onClick={toggleEdit}>Complete Units</button>}
      <div>
        Label: {order.label}
      </div>
      <div>
        Total Order: {order.orderquantity}
      </div>
      <div>
        Employee: {order.Users.name}
      </div>
      <div>
        Item: {order.Inventory.itemname}
      </div>
    </li>
  )
}
