import { useEffect, useState } from 'react';
import {
  getTransactions,
} from '../services/transaction-service.js';

export function useTransactions() {
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetch = async () => {
      const { data, error } = await getTransactions();
      if (ignore) return;

      if (error) {
        setError(error);
      }
      if (data) {
        setTransactions(data);
      }
    };

    fetch();
    return () => (ignore = true);
  }, []);

  return transactions;
}
