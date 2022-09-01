import { client } from './supabase-client';

export function getUser() {
  return client.auth.session() && client.auth.session().user;
}

export async function signupUser(email, password) {
  const response = await client.auth.signUp({ email, password });

  return response.user;
}

export async function signInUser(email, password) {
  const response = await client.auth.signIn({ email, password });

  return response.user;
}

export async function logout() {
  await client.auth.signOut();

  return (window.location.href = '../');
}

export async function getRankOfUser(user_id) {
  const response = await client
    .from('Users')
    .select('role')
    .eq('id', user_id)
    .single();
  return response.body.role;
}

export async function getIdOfUser(user_id) {
  const response = await client
    .from('Users')
    .select('id')
    .eq('id', user_id)
    .single();
  return response.body.id;
}

// export async function getEmailOfUser(user_id) {
//   const response = await client
//     .from('Auth.Users')
//     .select('email')
//     .eq('id', user_id)
//     .single();
//     console.log(response.body.Email)
//   return response.body.Email;
// }