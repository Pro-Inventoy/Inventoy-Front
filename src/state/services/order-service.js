import client from './client.js';

export async function getItems() {
  const response = await client
  .from('Inventory')
  .select(`
    inventoryId,
    )
  `)
  .order('inventoryId')
  return response;
}

export async function updateOrder(completed, id) {
  const original = await client
  .from('Orders')
  .select(`
    completed
  `)
  .eq( 'id', id )
  .single();
  const newCompleted = Number(original.data.completed) + Number(completed);
  const response = await client
    .from('Orders')
    .upsert({ 'id': id, completed: newCompleted });
  return response;
}

export async function getOrders() {
    const response = await client
    .from('Orders')
    .select(`
      id,
      date,
      label,
      orderquantity,
      completed,
      Users (empname),
      Inventory(itemname)
      )
    `)
    .order('id')
    return response;
}

export async function addOrder(order) {
  const response = await client
    .from('Orders')
    .insert(order)
    .single();
  return response;
}

export async function getIdOfItem(inventory) {
  const response = await client
    .from('Inventory')
    .select('inventoryId')
    .match({'itemname': inventory})
    .single();
  return response.body.inventoryId;
}

export async function removeOrder(id) {
  const response = await client
    .from('Orders')
    .delete()
    .eq('id', id)
    .single();
  return response;
}
