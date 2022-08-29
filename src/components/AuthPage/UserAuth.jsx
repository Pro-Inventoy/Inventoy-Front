import Auth from './Auth.jsx';
import './UserAuth.css';
import { useStatus } from '../../state/hooks/userAuth.js';
import Profile from './Profile.jsx';

export default function UserAuth() {
  const { user, profile } = useStatus();
console.log(user);
  return (
    <section className="UserAuth">
      { user ? <Profile /> : <Auth/>}

      {/* <div className="Data">
        <h2>User</h2>
        <pre>{user.userId}</pre>
        <h2>Profile</h2>
        <pre>{JSON.stringify(profile, true, 2)}</pre>
      </div> */}
    </section>
  );
}