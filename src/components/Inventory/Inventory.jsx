import React from 'react'
import InventoryList from './InventoryList.jsx'
import AddInventory from './AddInventory.jsx'
// import './AddInventory.css'

export default function Inventory() {
  return (
    <div>
 {/* <NavBar/>
     <FolderBar />
     <SearchBar /> */}
    <AddInventory />
    <InventoryList />
    </div>
  )
}