import { useEffect, useState } from 'react';
import {
  getEmployees,
} from '../services/emp-service.js';

export function useUsers() {
  const [error, setError] = useState(null);
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetch = async () => {
      const { data, error } = await getEmployees();
      if (ignore) return;

      if (error) {
        setError(error);
      }
      if (data) {
        setItems(data);
      }
    };

    fetch();
    return () => (ignore = true);
  }, []);

  return items;
}
