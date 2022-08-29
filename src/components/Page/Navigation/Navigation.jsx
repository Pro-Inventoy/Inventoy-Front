import './Navigation.css';
import { handTruck, wareHouse, persons, profile, home } from '../Icons'

export default function Navigation() {
  return (
    <nav className="Navigation">
      <a id="Home" className="menu-item" href="/">{home}<br/>Home</a>
          <a id="Inventory" className="menu-item" href="/inventory">{wareHouse}<br/>Inventory</a>
          <a id="Orders" className="menu-item" href="/orders">{handTruck}<br/>Orders</a>
          <a id="Users" className="menu-item" href="/users">{persons}<br/>Users</a>
          <a id="Profile" className="menu-item" href="/profile">{profile}<br/>Profile</a>
    </nav>
  );
}

