import React, { useState } from 'react'
import { useCategories } from '../../state/hooks/inventory';
import { addItem, getIdOfCategory } from '../../state/services/inventory-service';
import { FormButton, InputControl, SelectControl } from '../Forms/FormControl';

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
  
  return (
    <div>
    <form className='inventoryAddForm' onSubmit={handleSubmit}>
      <InputControl
        type={'number'}
        label={'quantity'}
        value={quantity}
        onChange={handleQuantity}
      />
      <SelectControl
            type={'string'}
            label={'category'}
            value={category}
            onChange={handleCategory}>
        <option></option>
        {allCategories.map((item) => (
          <option key={item.category_name} value={`${item.category_name}`}>
            {item.category_name}
          </option>
        ))}
      </SelectControl>
      <InputControl
        type={'number'}
        label={'cost'}
        value={cost}
        onChange={handleCost}
      />
      <InputControl
        type={'string'}
        label={'item name'}
        value={itemName}
        onChange={handleItemName}
      />
      <FormButton>Add</FormButton>
    </form>
    </div>
  )
}
