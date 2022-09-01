import React, { useEffect, useState } from 'react'
//import { useTransactions } from '../../state/hooks/transaction'
import { getNameOfUser } from '../../state/services/user-service';
import { getUser, getRankOfUser } from '../../state/services/supabase-utils';


export default function Profile() {

  const [empName, setEmpName] = useState('');
  const [empRank, setEmpRank] = useState('');
  const {id} = getUser();

 useEffect(() => {
  const fetchedName = async () => {
    const fetchingName = await getNameOfUser(id)

  setEmpName(fetchingName);

  
  }

  const fetchedRank = async () => {
    const fetchingRank = await getRankOfUser(id)

  setEmpRank(fetchingRank);
  }

  fetchedName()
  fetchedRank()

    .catch(console.error);
}, [id])


  return (
    <span>
      <div className='profilePic'>
        <img src='https://i.imgur.com/tF6PAok.png' alt='employee pfp'/>
        <br></br>
        <button>Edit Picture</button>
      </div>
      {/* <div>
        <p>User's email:</p>
      </div> */}

      <div>
        <h2>{`User's name: ${empName}`}</h2>
        <h3>{`User's Employment level: ${empRank}`}</h3>
        <h4>User's Worked Orders:</h4>
        <ul>
        </ul>
      </div>
    </span>
  )
}