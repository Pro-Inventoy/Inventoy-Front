import { useState } from 'react';
import { useProfile } from '../../state/hooks/userAuth.js';
//import { useForm } from '../../state/hooks/formData.js';
import { getUser } from '../../state/services/supabase-utils';
import { FormButton, InputControl } from '../Forms/FormControl.jsx';
import './Profile.css';

export default function ProfileSetup() {
  const [, updateProfile] = useProfile();
//   const [profile, handleChange] = useForm();
//   const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);

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


const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedInUser = await getUser();

      const userId = loggedInUser.id;
      setIsLoading(true);

      await updateProfile({empname: username});
      await updateProfile(userId.username);
      setIsLoading(false);
  };

  return (
    <section className="Profile">
      <form onSubmit={handleSubmit}>
        <h1>Employee Profile Setup</h1>

        {/* <InputControl
          label="Employee Name"
          name="empname"
          required
          placeholder="enter employee name"
        //   value={profile.empname}
          onChange={handleChange}
        /> */}

        <input value={username} onChange={(e) => setUsername(e.target.value)} />

        {/* <InputControl
          className="Avatar"
          label="Avatar"
          name="avatar"
          required
          type="file"
          onChange={handlePreview}>
          {preview && <img src={preview} alt="avatar preview"/>}
        </InputControl> */}

        <FormButton >Update</FormButton>
      </form>
    </section>
  );
}
