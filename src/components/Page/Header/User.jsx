import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '../../../state/hooks/userAuth.js';
import styles from './User.css';

export default function Menu() {
  const { signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const className = classNames(styles.User, {
    [styles.Open]: isOpen,
  });

  const handleClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div className={className}>
      User
      <button onClick={handleClick}>v</button>
      <div className={styles.UserMenu}>
        {/* <Link to="about">Profile</Link> */}
        <Link to="auth" onClick={signOut}>
          Sign Out
        </Link>
      </div>
    </div>
  );
}
