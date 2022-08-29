import { createContext, useEffect, useMemo, useState } from 'react';
import {
  getUser,
  getLocalProfile,
  saveLocalProfile,
  removeLocalProfile,
  getProfile,
  onAuthChange,
} from '../services/user-service.js';

export const UserStateContext = createContext();
console.log(UserStateContext, 'context');
export const UserActionContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [profile, setProfile] = useState(getLocalProfile());

  const loadProfile = async () => {
    const { data, error } = await getProfile();

    if (error) {
      // no row returned
      if (error.code === 'PGRST116') {
        setProfile(null);
        removeLocalProfile();
      }
      // unknown error...
      // eslint-disable-next-line no-console
      else console.log(error);
    }
    if (data) {
      setProfile(data);
      saveLocalProfile(data);
    }
  };

  useEffect(() => {
    if (user) loadProfile();

    const { data } = onAuthChange((event) => {
      if (event === 'SIGNED_IN') loadProfile();
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        removeLocalProfile();
      }
    });
    return () => {
      data.unsubscribe();
    };
  }, [user]);

  const stateValue = {
    user,
    profile,
  };

  const actionValue = useMemo(
    () => ({
      setUser,
      setProfile,
    }),
    [setUser, setProfile]
  );

  return (
    <UserStateContext.Provider value={stateValue}>
      <UserActionContext.Provider value={actionValue}>
        {children}
      </UserActionContext.Provider>
    </UserStateContext.Provider>
  );
}