import React, { useEffect, useState } from 'react'
import { getNameOfUser } from '../../state/services/user-service';
import Grid  from '../Orders/Grid.jsx';
import { getUser, getRankOfUser, getOrdersOfUser, getAvatarOfUser } from '../../state/services/supabase-utils';
import './ProfileStyle.css'


export default function Profile() {

  const [empName, setEmpName] = useState('');
  const [empRank, setEmpRank] = useState('');
  const [empAv, setEmpAv] = useState('');
  const [empOrders, setEmpOrders] = useState([]);
  const {id} = getUser();

  
  useEffect(() => {
    const fetchedName = async () => {
      const fetchingName = await getNameOfUser(id)
      
    setEmpName(fetchingName);
  }

  const fetchedOrders = async () => {
    const fetchingOrders = await getOrdersOfUser(id)
    setEmpOrders(fetchingOrders);
  }

  const fetchedAvatar = async () => {
    const fetchingAvatar = await getAvatarOfUser(id)
    
    setEmpAv(fetchingAvatar);
  }

  const fetchedRank = async () => {
    let fetchingRank = await getRankOfUser(id)

    if (fetchingRank === 3) {
      fetchingRank = 'Associate';
    } else if (fetchingRank === 2) {
      fetchingRank = 'Manager';
    } else {
      fetchingRank = 'Admin';
    }

    setEmpRank(fetchingRank);
  }

  fetchedName()
  fetchedRank()
  fetchedOrders()
  fetchedAvatar()

    .catch(console.error);
}, [id])


  return (
    <span>
      <div className='profilePic'>
        <img src={`${empAv}`} alt='employee pfp'/>
      </div>

      <div>
        <h2 className="profilesetup">{`User's name: ${empName}`}</h2>
        <h3 className="profilesetup">{`User's Employment level: ${empRank}`}</h3>
        <h4 className="profilesetup">User's Worked Orders:</h4>
          <Grid orders={empOrders}/>
      </div>
    </span>
  )
}