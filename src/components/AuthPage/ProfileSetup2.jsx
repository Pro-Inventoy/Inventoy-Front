import { useState } from 'react';
import { useProfile } from '../../state/hooks/userAuth.js';
import { useForm } from '../../state/hooks/formData.js';
import { FormButton, InputControl } from '../Forms/FormControl.jsx';
import './Profile.css';

export default function ProfileSetup() {
  const [, updateProfile] = useProfile();
  const [profile, handleChange] = useForm();
  const [preview, setPreview] = useState();

  const handlePreview = (e) => {
    const target = e.target;
    const [file] = target.files;
    setPreview(URL.createObjectURL(file));
    // handleChange({
    //   target: {
    //     name: target.name,
    //     value: file,
    //   },
    // });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   await updateProfile(profile);
  };

  return (
    <section className="Profile">
      <form onSubmit={handleSubmit}>
        <h1>Employee Profile Setup</h1>

        <InputControl
          label="Employee Name"
          name="employeename"
          required
          placeholder="enter employee name"
          value={profile.employeename}
          onChange={handleChange}
        />

        <InputControl
          className="Avatar"
          label="Avatar"
          name="avatar"
          required
          type="file"
          onChange={handlePreview}>
          {preview && <img src={preview} alt="avatar preview"/>}
        </InputControl>

        <FormButton >Update</FormButton>
      </form>
    </section>
  );
}
