import client from './client.js';

export async function getEmployees() {
    const response = await client
    .from('Users')
    .select(`
      id,
      empname,
      role
    `)
    .order('id')
    return response;
}

export async function addEmployee(employee) {
  const response = await client
    .from('Users')
    .insert(employee)
    .single();
  return response;
}

export async function getIdOfUser(employee) {
  const response = await client
    .from ('Users')
    .select(`
      id
    `)
    .eq('empname', employee)
    .single()
  return response.data.id;
}