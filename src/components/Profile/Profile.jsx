import React, { useEffect, useState } from 'react'
//import { useTransactions } from '../../state/hooks/transaction'
import { getNameOfUser } from '../../state/services/user-service';
import Grid  from '../Orders/Grid.jsx';
import { getUser, getRankOfUser, getOrdersOfUser } from '../../state/services/supabase-utils';


export default function Profile() {

  const [empName, setEmpName] = useState('');
  const [empRank, setEmpRank] = useState('');
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

    .catch(console.error);
}, [id])


  return (
    <span>
      <div className='profilePic'>
        <img src='https://i.imgur.com/tF6PAok.png' alt='employee pfp'/>
        <br></br>
        <button>Edit Picture</button>
      </div>

      <div>
        <h2>{`User's name: ${empName}`}</h2>
        <h3>{`User's Employment level: ${empRank}`}</h3>
        <h4>User's Worked Orders:</h4>
          <Grid orders={empOrders}/>
      </div>
    </span>
  )
}