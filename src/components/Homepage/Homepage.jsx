import React from 'react'
import { useTransactions } from '../../state/hooks/transaction'

export default function Homepage() {
  const transactions = useTransactions();
  // transactions is the 10 most recent transactions, most recent at [0]
  return (
    <span>
      <div>
        Click on one of the icons above to navigate to the appropriate page.
      </div>
      <div>
        <h2>Recent Activity</h2>
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