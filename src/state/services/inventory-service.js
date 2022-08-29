import client from './client.js';

export async function getItems() {
  const response = await client
  .from('Inventory')
  .select(`
    inventoryId,
    itemname,
    quantity,
    cost,
    Categories (
    category_name
    )
  `)
  .order('inventoryId')
  return response;
}

export async function updateQuantity(quantity, inventoryId) {
  const response = await client
    .from('Inventory')
    .upsert({ 'inventoryId': inventoryId, 'quantity': quantity });
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
  return response;
}

export async function getIdOfCategory(category) {
  const response = await client
    .from('Categories')
    .select('categoryid')
    .match({'category_name': category})
    .single();
  return response.body.categoryid;
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
