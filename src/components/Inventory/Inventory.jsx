import React from 'react'
import InventoryList from './InventoryList.jsx'
import AddInventory from './AddInventory.jsx'

export default function Inventory() {
  return (
    <div>
    <AddInventory />
    <InventoryList />
    </div>
  )
}