import React, { useState } from 'react';
import { signInUser, signupUser } from '../../state/services/supabase-utils';
// import { Auth } from '@sup'
import client from '../../state/services/client';
import './Auth.css';
export default function AuthPage({ setCurrentUser }) {

  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');  
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  function clearForms() {
    setSignInEmail('');
    setSignInPassword('');
    setSignUpEmail('');
    setSignUpPassword('');
  }

  const handleOauth = async (provider) => {
    let { error } = await client.auth.signIn({ provider });
    if(error) console.log("Error: ", error.message)
  }
  async function handleSignUp(e) {
    e.preventDefault();

    const user = await signupUser(signUpEmail, signUpPassword);
    setCurrentUser(user);
    clearForms();
    return (window.location.href = '/homepage')
  }

  async function handleSignIn(e) {
    e.preventDefault();

    const user = await signInUser(signInEmail, signInPassword);
    setCurrentUser(user);
    clearForms();
    return (window.location.href = '/homepage')
  }

  return (
    <div className="home-page">
      
      <div className='login-form'>
        <form className="form-input" onSubmit={handleSignUp}>
          <h2>Sign Up</h2>
          <label>
            <p>Email</p>
            <input value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input value={signUpPassword} type='password' onChange={e => setSignUpPassword(e.target.value)} />
          </label>
          <button className="button">Sign Up</button>
        </form>
      </div>
      <div className='login-form'>
      <button
          onClick={(() => handleOauth("google"))}>Sign in Using Google</button>
      </div>
      <div className='login-form'>
        <form className="form-input" onSubmit={handleSignIn}>
          <h2>Sign In</h2>
          <label>
            <p>Email</p>
            <input value={signInEmail} onChange={e => setSignInEmail(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input value={signInPassword} type='password' onChange={e => setSignInPassword(e.target.value)} />
          </label>
          <button className="button">Sign In</button>
        </form>
        

      </div>
      
    </div>
  );
}

