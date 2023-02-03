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

export async function getOrdersOfUser(user_id) {
  const response = await client
    .from('Orders')
    .select('*')
    .eq('user_id', user_id)
  return response.body;
}


export async function getAvatarOfUser(user_id) {
  const response = await client
    .from('Users')
    .select('avatars')
    .eq('id', user_id)
    .single();
  return response.body.avatars;
}

export async function uploadAvatar(event) {
  const avatarFile = event.target.files[0]
  const { data, error } = await client.storage
  .from('avatars')
  .upload( 'public/avatar.png', avatarFile, {
    cacheControl: '3600',
    upsert: false,
  })
  console.log(avatarFile);
return { data, error }
}