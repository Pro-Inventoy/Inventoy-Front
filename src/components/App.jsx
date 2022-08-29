import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react'
import Homepage from './Homepage/Homepage.jsx'
import Inventory from './Inventory/Inventory.jsx'
import Orders from './Orders/Orders.jsx'
import Users from './Users/Users.jsx'
import Profile from './Profile/Profile.jsx'
import Layout from './Page/Layout.jsx'
import UserAuth from './AuthPage/UserAuth.jsx'
import Scanner from './Scanner/Scanner.jsx'
import './App.css'
export default function App() {
  return (
    <div>
        <Router>
            <Routes>
              <Route path="user/*" element={<UserAuth />} />
                {/* <Route path="auth" element={<Auth />} /> */}
                <Route element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="users" element={<Users />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="scanner" element={<Scanner />} />
                </Route>
            </Routes>
        </Router>
    </div>
  )
}
