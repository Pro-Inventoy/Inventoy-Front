import React from 'react'
import { useTransactions } from '../../state/hooks/transaction'

export default function Profile() {
  const transactions = useTransactions();
  // transactions is the 10 most recent transactions, most recent at [0]
  return (
    <span>
      <div className='profilePic'>
        <img src='https://i.imgur.com/tF6PAok.png'/>
        <br></br>
        <button>Edit Picture</button>
      </div>
      <div>
        <p>User's name</p>
        <p>User's email</p>
        <p>User's phone#</p>
      </div>

      <div>
        <h2>User's name and Work ID will go here</h2>
        <h3>User's role</h3>
        <h4>User's Worked Orders:</h4>
        <ul>
          {transactions.map(item => (
            <li key={item.id}>
              {item.user + item.content}
            </li>
      ))}
        </ul>
      </div>
    </span>
  )
}