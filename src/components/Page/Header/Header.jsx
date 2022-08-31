// import SlideoutMenu from './SlideoutMenu.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import User from './User.jsx';
import './Header.css';
import Hamburger from './HamburgerMenu.jsx';
import { useWindowDimensions } from '../Layout.jsx';

const primary = [
  { to: '/', label: 'Home' },
  { to: 'inventory', label: 'Inventory' },
  { to: 'orders', label: 'Orders' },
  { to: 'users', label: 'Users' },
  { to: 'profile', label: 'Profile' },
];


export default function Header() {
  const { width, height } = useWindowDimensions();
  return (
    <header className="Header">
      <div className="MenuContainer">
        {width * 1.3 <= height  ? <Hamburger style="margin:0px; width: 450px;"/> : <></>}
      </div>
      <div className="NavigationContainer">
        {width * 1.3 > height  ? <Navigation navigation={primary} /> : <></> }
      </div>

      <User />
    </header>
  );
}
