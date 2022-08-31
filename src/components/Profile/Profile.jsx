import React from 'react'
//import { useTransactions } from '../../state/hooks/transaction'
import { getNameOfUser } from '../../state/services/user-service';
import { getUser } from '../../state/services/supabase-utils';

export default function Profile() {

  const empName = async function userInfo() {
    const {id} = getUser();
    const employee = await getNameOfUser(id);
    return employee.body.empname;
  }

  return (
    <span>
      <div className='profilePic'>
        <img src='https://i.imgur.com/tF6PAok.png' alt='employee pfp'/>
        <br></br>
        <button>Edit Picture</button>
      </div>
      <div>
        <p>User's name: {empName}</p>
        <p>User's email:</p>
      </div>

      <div>
        <h2>User's name and Work ID will go here</h2>
        <h3>User's Employment level:</h3>
        <h4>User's Worked Orders:</h4>
        <ul>
        </ul>
      </div>
    </span>
  )
}