import React from 'react'
import OrderList from './OrderList.jsx'
import AddOrder from './AddOrder.jsx'

export default function Order() {
  return (
    <div>
    {/* <NavBar/>
     <FolderBar />
     <SearchBar /> */}
    <AddOrder />
    <OrderList />
    </div>
  )
}