import React, { useState } from 'react'
import { useItems } from '../../state/hooks/inventory';
import { useUsers } from '../../state/hooks/user';
import { addOrder, getIdOfItem } from '../../state/services/order-service';
import { FormButton, InputControl, SelectControl } from '../Forms/FormControl';
import './AddOrder.css';

export default function AddOrder() {
  const [quantity, setQuantity] = useState(0);
  const [item, setItem] = useState('');
  const [user, setUser] = useState('');
  const [label, setLabel] = useState('');
  const handleQuantity = ({ target }) => setQuantity(target.value);
  const handleItem = ({ target }) => setItem(target.value);
  const handleUser = ({ target }) => setUser(target.value);
  const handleLabel = ({ target }) => setLabel(target.value);
  const allItems = useItems();
  const allUsers = useUsers();
// const allUsers = [{empname: 'Armstrong'}, {empname:'Jon Arbuckle'}];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const computedUser = await getIdOfUser(employee);
    const computedUser = 1;
    const computedItem = await getIdOfItem(item);
    await addOrder({ label: label, orderquantity: quantity, productId: computedItem, userId: computedUser})
    setQuantity(0);
    setLabel(0);
    setItem('');
  };
  return (
    <div>
    <form className='orderAddForm' onSubmit={handleSubmit}>
      <InputControl
        type={'number'}
        label={'quantity'}
        value={quantity}
        onChange={handleQuantity}
      />
      <SelectControl
            type={'string'}
            label={'Item'}
            value={item}
            onChange={handleItem}>
        <option></option>
        {allItems.map((item) => (
          <option key={item.itemname} value={`${item.itemname}`}>
            {item.itemname}
          </option>
        ))}
      </SelectControl>
      <SelectControl
            type={'string'}
            label={'User'}
            value={user}
            onChange={handleUser}>
        <option></option>
        {allUsers.map((item) => (
          <option key={item.empname} value={`${item.empname}`}>
            {item.empname}
          </option>
        ))}
      </SelectControl>
      <InputControl
        type={'string'}
        label={'label'}
        value={label}
        onChange={handleLabel}
      />
      <FormButton>Add</FormButton>
    </form>
    </div>
  )
}
