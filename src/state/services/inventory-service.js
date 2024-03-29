import client from './client.js';
import { addTransaction } from './transaction-service.js';
import { getUser } from './user-service.js';

export async function getItems() {
  const response = await client
  .from('Inventory')
  .select(`
    id,
    itemname,
    quantity,
    cost,
    Categories (
    category_name
    )
  `)
  .order('id')
  
  return response;
}

export async function updateQuantity(quantity, id) {
  const response = await client
    .from('Inventory')
    .upsert({ 'id': id, 'quantity': quantity });
  return response;
}

export async function getCategories() {
  const response = await client
    .from('Categories')
    .select('category_name')
  return response;
}

export async function addItem(item) {
  const response = await client
    .from('Inventory')
    .insert(item)
    .single();
  await addTransaction({icon: 'https://img.icons8.com/ios-filled/344/drop-shipping.png', user_id: getUser().id, content: ' added ' + item.quantity + ' ' + item.itemname})
  return response;
}

export async function getNameOfItem(id) {
  const response = await client
    .from('Inventory')
    .select('itemname')
    .match({'id': id})
    .single();
  return response.body.itemname;
}

export async function getIdOfCategory(category) {
  const response = await client
    .from('Categories')
    .select('categoryid')
    .match({'category_name': category})
    .single();
  return response.body.categoryid;
}

export async function getNameOfCategory(id) {
  const response = await client
    .from('Categories')
    .select('category_name')
    .match({'category_id': id})
    .single();
  return response.body.category_name;
}

export async function updateItem(newName, item) {
  const id = item.id;
  const updatedItem = { ...item, Name: newName };
  const response = await client
    .from('Inventory')
    .update(updatedItem)
    .match({ id })
    .single();
  return response;
}

export async function removeItem(id) {
  const response = await client
    .from('Inventory')
    .delete()
    .eq('id', id)
    .single();
  return response;
}
