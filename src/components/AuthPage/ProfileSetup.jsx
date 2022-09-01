import { useState } from 'react';
import { useProfile } from '../../state/hooks/userAuth.js';
//import { useForm } from '../../state/hooks/formData.js';
import { getUser } from '../../state/services/supabase-utils';
import { FormButton } from '../Forms/FormControl.jsx';
import './Profile.css';

export default function ProfileSetup() {
    const [, updateProfile] = useProfile();
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState();
    //const [profile, handleChange] = useForm();
    //const [preview, setPreview] = useState();
    const [isLoading, setIsLoading] = useState(false);

    function clearForms() {
        setUsername('');
      }

    //   function uploadImage(e) {
    //     setAvatar([...e.target.files]);
    //   }

//   const handlePreview = (e) => {
//     const target = e.target;
//     const [file] = target.files;
//     setPreview(URL.createObjectURL(file));
//     handleChange({
//       target: {
//         name: target.name,
//         value: file,
//       },
//     });
//   };
        function handleChange(e) {
            setAvatar(e.target.files[0]);
        }

  async function handleSubmit(e) {
    e.preventDefault();
    const loggedInUser = await getUser();

      const userId = { ...loggedInUser };
      setIsLoading(true);
      const userRole = 3;
      

      await updateProfile({empname: username, role: userRole, avatars: avatar});
      await updateProfile(userId);
      
      clearForms();
      setIsLoading(false);
    return (window.location.href = '/homepage')
  };


  return (
    <section className="Profile">
      <form onSubmit={handleSubmit}>
        <h1>Employee Profile Setup</h1>


        <input value={username} onChange={(e) => setUsername(e.target.value)}/>

        <input type='file' value={avatar} onChange={handleChange}/>

        <FormButton>Create Your Profile</FormButton>
      </form>
    </section>
  );
}
