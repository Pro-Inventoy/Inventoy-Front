import { useContext } from 'react';
import {
  signIn as signInService,
  signUp as signUpService,
  signOut as signOutService,
  uploadAvatar,
  upsertProfile,
} from '../services/user-service.js';
import {
  UserStateContext,
  UserActionContext,
  UserProvider,
} from '../context/UserContext.jsx';

export function useStatus() {
  const { user, profile } = useContext(UserStateContext);
  console.log(user, 'in userauth js');
  return { user, profile };
}

export function useAuth() {
  let setUser = UserProvider.setUser
  setUser  = useContext(UserActionContext);

  const createAction = (service) => async (credentials) => {
    const { user, error } = await service(credentials);

    if (error) {
      console.log(error.message);
    }
    if (user) {
      setUser(user);
    }
  };

  const signIn = createAction(signInService);
  const signUp = createAction(signUpService);
  const signOut = createAction(signOutService);

  return {
    signIn,
    signUp,
    signOut,
  };
}

export function useProfile() {
  const { user, profile } = useContext(UserStateContext);
  const { setProfile } = useContext(UserActionContext);

  const updateProfile = async ({ ...profile }) => {
    console.log(profile, 'profile update1');
      const { data, error } = await upsertProfile({
        ...profile,
        
       
      });
      console.log(data, 'data log1');

      if (error) {
        console.log(error.message);
      }
      if (data) {
        setProfile(data);
        console.log(`Profile updated for "${data.empname}"`);
      }
      
    // }
    // const { url, error } = await uploadAvatar(user.id, avatar);
    // if (error) {
    //   console.log(error.message);
    // }
    // if (url) {
    //   const { data, error } = await upsertProfile({
    //     ...profile,
    //     avatar: url,
    //   });

    //   if (error) {
    //     console.log(error.message);
    //   }
    //   if (data) {
    //     setProfile(data);
    //     console.log(`Profile updated for "${data.empname}"`);
    //   }
    // }
  };

  return [profile, updateProfile];
}