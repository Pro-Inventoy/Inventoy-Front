import React, { useState } from 'react'
import { useItems } from '../../state/hooks/inventory';
import { useUsers } from '../../state/hooks/user';
import { addOrder, getIdOfItem } from '../../state/services/order-service';
import { addTransaction } from '../../state/services/transaction-service';
import { FormButton, InputControl, SelectControl } from '../Forms/FormControl';
import './AddOrder.css';
import './AddInventory.css'

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO const computedUser = await getIdOfUser(employee);
    const computedUser = 1;
    const computedItem = await getIdOfItem(item);
    await addOrder({ label: label, orderquantity: quantity, productId: computedItem, userId: computedUser})
    //TODO auth getuser
    await addTransaction({user: 1, content:' ordered ' + quantity + ' ' + item});
    setQuantity(0);
    setLabel(0);
    setItem('');
  };

  return (
    <div className="divwrapper">
    <form className='inventoryAddForm' onSubmit={handleSubmit}>
      <div className="divwrap">
      <div>
      <InputControl className="compstyle"
        type={'number'}
        label={'Quantity'}
        value={quantity}
        onChange={handleQuantity}
      />
      </div>
      <div>
      <SelectControl className="compstyle"
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
      </div>
      </div>

      <div className="divwrap">
        <div>
      <SelectControl className="compstyle"
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
      </div>
      <div>
      <InputControl className="compstyle"
        type={'string'}
        label={'Label'}
        value={label}
        onChange={handleLabel}
      />
      </div>
      </div>
      <div>
      <FormButton className="addbutton">Add<br/>Order</FormButton>
      </div>
    </form>
    </div>
  )
}
