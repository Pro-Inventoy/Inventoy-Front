import React, { useState } from 'react'
import client from '../../state/services/client.js'
import { useCategories } from '../../state/hooks/inventory';
import { addItem, getIdOfCategory } from '../../state/services/inventory-service';
import { FormButton, InputControl, SelectControl } from '../Forms/FormControl';
import './AddInventory.css'

export default function AddInventory() {
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [cost, setCost] = useState('');
  const handleQuantity = ({ target }) => setQuantity(target.value);
  const handleCategory = ({ target }) => setCategory(target.value);
  const handleItemName = ({ target }) => setItemName(target.value);
  const handleCost = ({ target }) => setCost(target.value);
  const allCategories = useCategories();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const computedCategory = await getIdOfCategory(category);
    await addItem({ itemname: itemName, categoryid: computedCategory, quantity: quantity, cost: cost})
    setQuantity(0);
    setCost(0);
    setCategory('');
    setItemName('');
  };
  React.useEffect(() => {
    const sub = client
    .from('Inventory')
    .on('UPDATE', payload => {
      setItemName(...itemName)
    })
    .subscribe()
    return () => client.removeSubscription(sub);
  },[itemName])

  return (
    <div>
    <form className='inventoryAddForm' onSubmit={handleSubmit}>
      <div className="formycontrolly">
      <InputControl
        type={'number'}
        label={'Quantity '}
        value={quantity}
        onChange={handleQuantity}
      />
      <SelectControl
            type={'string'}
            label={'Category '}
            value={category}
            onChange={handleCategory}>
        <option></option>
        {allCategories.map((item) => (
          <option key={item.category_name} value={`${item.category_name}`}>
            {item.category_name}
          </option>
        ))}
      </SelectControl>
      </div>
      <div className="formycontrolly">
      <InputControl
        type={'number'}
        label={'Cost '}
        value={cost}
        onChange={handleCost}
      />
      <InputControl
        type={'string'}
        label={'Item Name ' }
        value={itemName}
        onChange={handleItemName}
      />
      <FormButton>Add</FormButton>
      </div>
      
    </form>
      <button className='scannerButton' onClick={() =>{window.location.replace('./scanner')}}>📷</button>
    </div>
  )
}
