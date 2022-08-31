import React, { useEffect, useRef } from 'react'
import { RealtimeClient } from '@supabase/realtime-js'
import { useTransactions } from '../../state/hooks/transaction'
import './Homepage.css'
import client from '../../state/services/client';
import { getNameOfUser, getUser } from '../../state/services/user-service';

export default function Homepage() {
  const { transactions } = useTransactions();
  // transactions is the 10 most recent transactions, most recent at [0]
  const ref = useRef({
    subscription: null
});

useEffect(() => {
  if (!ref.current.subscription) {
  const REALTIME_URL = process.env.REALTIME_URL || 'ws://localhost:3000/socket' 
  const socket = new RealtimeClient(REALTIME_URL)
  socket.connect()
  ref.current.subscription = client
    .from('Transactions')
    .on("*", async (payload) => {
      const transListElement = document.getElementById('transactionList');
      const newTransactionListItem = document.createElement('li');
      const newTransactionListImage = document.createElement('img');
      newTransactionListImage.src = payload.new.icon;
      newTransactionListImage.alt = '';
      newTransactionListImage.classList = 'trans-icon';
      const userName = await (await getNameOfUser(getUser().id)).data.empname;
      const newTransactionList = document.createTextNode(userName + payload.new.content)
      newTransactionListItem.appendChild(newTransactionListImage);
      newTransactionListItem.appendChild(newTransactionList);
      transListElement.insertBefore(newTransactionListItem, transListElement.firstChild);
    })
    .subscribe((status,e)=>{console.log(status,e)})
}
}, []);

  return (
    <span>
      <div>
        Click on one of the icons above to navigate to the appropriate page.
      </div>
      <div>
        <h2>Recent Activity</h2>
        <ul id='transactionList'>
          {transactions.map(item => (
            <li key={item.id}>
              <img className='trans-icon' alt='' src={item.icon}/>{item.empname.body.empname}{item.content}
            </li>
          ))}
        </ul>
      </div>
      <p>Icons by https://icons8.com</p>
    </span>
  )
}