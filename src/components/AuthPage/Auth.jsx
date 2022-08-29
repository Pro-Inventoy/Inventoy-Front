import { Link, Route, Routes } from 'react-router-dom';
import {
  InputControl,
  FormButton,
} from '../Forms/FormControl.jsx';
import { useForm } from '../../state/hooks/formData.js';
import { useAuth } from '../../state/hooks/userAuth.js';
import './Auth.css';

export default function Auth() {
  const { signIn, signUp } = useAuth();
  
  const signUpInfo = {
    header: 'Create new account',
    button: 'Sign Up',
    prompt: 'You got an account already?',
    link: '../',
    onSubmit: signUp,
  };
  
  const signInInfo = {
    header: 'Sign in account',
    button: 'Sign In',
    prompt: 'New Account?',
    link: 'sign-up',
    onSubmit: signIn,
  };
  return (
    <Routes>
      <Route index element={<AuthForm {...signInInfo} />} />
      <Route path="sign-up" element={<AuthForm {...signUpInfo}/>} />
    </Routes>
  );
  
}


function AuthForm({ header, button, prompt, link }){
  const [credentials, handleChange] = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    onsubmit(credentials);
  };
  return (
    <section className="Auth">
      <form onSubmit={handleSubmit}>
        <h1>{header}</h1>

        <InputControl
          label="Email"
          name="email"
          type="email"
          required
          placeholder="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <InputControl
          label="Password"
          name="password"
          type="password"
          required
          placeholder="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <FormButton>{button}</FormButton>
        <Link to={link}>{prompt}</Link>
      </form>
    </section>
  );
}
