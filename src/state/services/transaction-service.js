import client from './client.js';

export async function getTransactions() {
    const response = await client
    .from('Transactions')
    .select(`
      id,
      user,
      content
      )
    `)
    .order('id', {ascending: false})
    .limit(10)
    return response;
}

export async function addTransaction(transaction) {
  const response = await client
    .from('Transactions')
    .insert(transaction)
    .single();
  return response;
}
