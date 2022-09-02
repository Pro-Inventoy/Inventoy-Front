import { useState } from 'react';
import { client } from '../../state/services/supabase-client';
import { useProfile } from '../../state/hooks/userAuth.js';
import { getUser } from '../../state/services/supabase-utils';
import { FormButton } from '../Forms/FormControl.jsx';
import './Profile.css';

export default function ProfileSetup() {
    const [, updateProfile] = useProfile();
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState([]);

    async function uploadAvatar(file) {
      const fileName = `${Date.now()}_${file.name}`
      const { data, error } = await client.storage
      .from('avatars')
      .upload( fileName, file);
      const url = await client.storage.from('avatars').getPublicUrl(fileName)
      console.log(data);
      console.log(url.publicURL);

      await updateProfile({ avatars: url.publicURL });
      return { data, error }
    }

    function clearForms() {
        setUsername('');
      }



  async function handleSubmit(e) {
    e.preventDefault();
    const loggedInUser = await getUser();

      const userId = { ...loggedInUser };
      
      const userRole = 3;
    console.log(avatar);
      await uploadAvatar(avatar); 
      await updateProfile({empname: username, role: userRole });
      await updateProfile(userId);
      
      clearForms();
      
    return (window.location.href = '/homepage')
  };

  return (
    <section className="Profile">
      <p className="employeesetup" align="left">Employee Profile Setup</p>
      <form onSubmit={handleSubmit} className="form-style">
        
        <br></br>
        <br></br>
        <p className="profilesetup">Please enter your full name</p>
        <input value={username} onChange={(e) => setUsername(e.target.value)}/>
        <br></br>
        <br></br>
        <p className="profilesetup">Upload a profile picture</p>
        <input type='file' onInput={(e) => setAvatar(e.target.files[0])}/>
        <br></br>
        <br></br>
        <FormButton>Create Your Profile</FormButton>
        <br></br>
        <br></br>
      </form>
    </section>
  );
}
