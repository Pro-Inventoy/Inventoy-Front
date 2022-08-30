import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { getUser } from '../state/services/supabase-utils';
import ProtectedRoutes from './AuthPage/ProtectRoutes.jsx';
import Homepage from './Homepage/Homepage.jsx'
import Inventory from './Inventory/Inventory.jsx'
import Orders from './Orders/Orders.jsx'
import Users from './Users/Users.jsx'
import Profile from './Profile/Profile.jsx'
import Layout from './Page/Layout.jsx'
import Auth from './AuthPage/Auth.jsx'
import Scanner from './Scanner/Scanner.jsx'
import { UserProvider } from '../state/context/UserContext.jsx';
import './App.css'
export default function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = getUser();
    setCurrentUser(user);
  }, []);

  return (
    <div>
      <UserProvider>
        <Router>
            <Routes>
                <Route path="user/*" element={<ProtectedRoutes />} />
                  <Route element={<Layout />}>
                      <Route element={<ProtectedRoutes />}>
                        <Route path="homepage" element={<Homepage />} />
                        <Route path="inventory" element={<Inventory />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="users" element={<Users />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="scanner" element={<Scanner />} />
                    </Route>
                </Route>
                <Route path='/auth' element={<Auth setCurrentUser={setCurrentUser}/>} />
            </Routes>
        </Router>
      </UserProvider>
    </div>
  )
}