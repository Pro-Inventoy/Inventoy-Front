import React, { useEffect, useRef } from 'react'
import { RealtimeClient } from '@supabase/realtime-js'
import { useTransactions } from '../../state/hooks/transaction'
import './Homepage.css'
import client from '../../state/services/client';
import { getNameOfUser, getUser } from '../../state/services/user-service';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Order', 'Order Filled'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

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
    <div>
    <span>
      <h2 className="list-title">Recent Activity</h2>
      <div className="list-container">
        <div></div>
        <ul id='transactionList'>
          {transactions.map(item => (
            <li key={item.id} className="list-item">
              <img className='trans-icon' alt='' src={item.icon}/> {item.empname.body.empname}{item.content}
            </li>
          ))}
        </ul>
      </div>
      <Pie data={data} />
      <p>Icons by https://icons8.com</p>
      
    </span>
    <></>
    
    </div>
  )
}