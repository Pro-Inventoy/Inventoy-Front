import { useEffect, useState } from 'react';
import client from '../services/client.js';
import {
  getItems,
  getCategories,
  getNameOfCategory,
} from '../services/inventory-service.js';

export function useItems() {
  const [error, setError] = useState(null);
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetch = async () => {
      let { data, error } = await getItems();
      if (ignore) return;

      if (error) {
        setError(error);
      }
      if (data) {
        data = data.map(item => ({
          "id": item.id,
          "itemname": item.itemname,
          "quantity": item.quantity,
          "cost": item.cost,
          "category_name": item.Categories.category_name,
        }
        ))
        setItems(data);
      }
    };
    fetch();
    return () => (ignore = true);
  }, []);

  useEffect(() => {
    const subscription = client
      .from('Inventory')
      .on("INSERT", async (payload) => {
        const category_name = await getNameOfCategory(payload.new.categoryId)
        const newItem = {
          id: payload.new.id,
          itemname: payload.new.itemname,
          cost: payload.new.cost,
          quantity:payload.new.quantity,
          category_name: category_name,
        }
        setItems(items => [...items, newItem]);
      })
      .subscribe((status,e)=>{console.log(status,e)})
      return () => {
        client.removeSubscription(subscription);
      }
  }, []);

  return { items, error };
}

export function useCategories() {
  const [error, setError] = useState(null);
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetch = async () => {
      const { data, error } = await getCategories();
      if (ignore) return;

      if (error) {
        setError(error);
      }
      if (data) {
        setCategories(data);
      }
    };

    fetch();
    return () => (ignore = true);
  }, []);
  return { categories, error } ;
}