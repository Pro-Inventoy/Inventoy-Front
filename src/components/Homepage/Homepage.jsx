import React, { useEffect } from 'react'
import { RealtimeClient } from '@supabase/realtime-js'
import { useTransactions } from '../../state/hooks/transaction'
import './Homepage.css'
import client from '../../state/services/client';

export default function Homepage() {
  const { transactions, setTransactions } = useTransactions();
  // const transactions = useTransactions().transactions;
  // transactions is the 10 most recent transactions, most recent at [0]
  let subscription = null;

  function transactionSubscribe() {
    if (!subscription) {
      console.log('hello console its me your boy');
      const REALTIME_URL = process.env.REALTIME_URL || 'ws://localhost:3000/socket' 
      const socket = new RealtimeClient(REALTIME_URL)
      socket.connect()
      subscription = client
        .from('Transactions')
        .on("*", (payload) => {
          console.log(payload);
          // setTransactions([...transactions, payload.new]);
        })
        .subscribe((status,e)=>{console.log(status,e)})
    }
  }

useEffect(() => {
  transactionSubscribe();
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