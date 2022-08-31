import { useEffect, useState } from 'react';
import {
  getTransactions,
} from '../services/transaction-service.js';  
import { getNameOfUser } from '../services/user-service.js';

export function useTransactions() {
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetch = async () => {
      let { data, error } = await getTransactions();
      //get data of transactions first
        for (let i = 0; i < data.length; i++) {
          data[i] = {...data[i], empname: await getNameOfUser(data[i].user_id)};
        }
        //for display purposes, add name of the user (joined from supabase) to the object
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
  return { transactions, error, setTransactions };
}
