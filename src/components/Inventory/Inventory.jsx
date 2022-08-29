import React from 'react'
import InventoryList from './InventoryList.jsx'
import AddInventory from './AddInventory.jsx'
import Cards from '../Cards/Card.jsx'
export default function Inventory() {
  return (
    <div>
 {/* <NavBar/>
     <FolderBar />
     <SearchBar /> */}
    <Cards/>
    <AddInventory />
    <InventoryList />
    </div>
  )
}