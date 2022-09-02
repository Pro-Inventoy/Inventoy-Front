import React, { useEffect, useRef } from 'react'
import { RealtimeClient } from '@supabase/realtime-js'
import { useTransactions } from '../../state/hooks/transaction'
import './Homepage.css'
import client from '../../state/services/client';
import { getNameOfUser, getUser } from '../../state/services/user-service';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useOrderData } from "../../state/hooks/order.js";
import { useWindowDimensions } from '../Page/Layout.jsx';



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
  const { orders, compOrders } = useOrderData();
  const { transactions } = useTransactions();

  let currentData = [0,0]
  if(orders){
    for(let i = 0; i < orders.length; i++){
      currentData[0] = currentData[0] + orders[i];
    }
    for(let i = 0; i < compOrders.length; i++){
      currentData[1] = currentData[1] + compOrders[i];
    }
    

  }
  const newData = {
    labels: ['Order', 'Order Filled'],
    datasets: [
      {
     
        data: currentData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }; 
  
  // transactions is the 10 most recent transactions, most recent at [0]
  const ref = useRef({
    inv_subscription: null
});

useEffect(() => {
  if (!ref.current.inv_subscription) {
  ref.current.inv_subscription = client
    .from('Transactions')
    .on("*", async (payload) => {
      const transListElement = document.getElementById('transactionList');
      const newTransactionListItem = document.createElement('li');
      newTransactionListItem.classList = "list-item";
      const newTransactionListImage = document.createElement('img');
      newTransactionListImage.src = payload.new.icon;
      newTransactionListImage.alt = '';
      newTransactionListImage.classList = 'trans-icon';
      const userId = getUser().id;
      const userName = await getNameOfUser(userId);
      const newTransactionList = document.createTextNode(userName + payload.new.content)
      newTransactionListItem.appendChild(newTransactionListImage);
      newTransactionListItem.appendChild(newTransactionList);
      transListElement.insertBefore(newTransactionListItem, transListElement.firstChild);
    })
    .subscribe((status,e)=>{console.log(status,e)})
}
}, []);
const { width, height } = useWindowDimensions();
  return (
    <div className="overdiv">
    <span className="span-elements">
      <h2 className="list-title">Recent Activity</h2>
      <div className="list-container">
        <div></div>
        { transactions.length ? <ul id='transactionList'>
          {transactions.map(item => (
            <li key={item.id} className="list-item">
              <img className='trans-icon' alt='' src={item.icon}/> {item.empname}{item.content}
            </li>
          ))}
        </ul> : <h1 className="loading-spinner">LOADING</h1> }
      </div>
      {width * 1.3 > height  ? <div className="pie-size-wide">
      <Pie data={newData}/>
      </div> : <div className="pie-size">
      <Pie data={newData}/>
      </div> }
      
      
      
    </span>
    
    <></>
    <p>Icons by https://icons8.com</p>
    </div>
  )
}