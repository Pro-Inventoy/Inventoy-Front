import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import './HamburgerMenu.css'
import { handTruck, wareHouse, persons, profile, home } from '../Icons'


class Hamburger extends React.Component {
    showSettings (event) {
      event.preventDefault();
    }

    
  
    render () {
      // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
      return (
        <div>
        <Menu>
          <h1 className="app-name2">InvenToy</h1>
          <a id="Home" className="menu-item" href="/">{home}<br/> Home </a>
          <a id="Inventory" className="menu-item" href="/inventory">{wareHouse}<br/>Inventory</a>
          <a id="Orders" className="menu-item" href="/orders">{handTruck}<br/>Orders</a>
          <a id="Users" className="menu-item" href="/users">{persons}<br/> Users</a>
          <a id="Profile" className="menu-item" href="/profile">{profile}<br/>Profile</a>
          {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
          <a href="https://icons8.com/icon/FyZQG5LCUbyS/warehouse" className="icon-credit">Menu icons by Icons8</a>
        </Menu>
        <h1 className="app-name-ham">InvenToy</h1>
        </div>
        
      );
    }
  }

  export default Hamburger