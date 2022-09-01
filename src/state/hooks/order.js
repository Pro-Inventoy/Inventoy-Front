import { useEffect, useState } from 'react';
import client from '../services/client.js';
import { getNameOfItem } from '../services/inventory-service.js';
import {
  getOrders,
} from '../services/order-service.js';
import { getNameOfUser } from '../services/user-service.js';

export function useOrders() {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetch = async () => {
      let { data, error } = await getOrders();

      if (ignore) return;

      if (error) {
        setError(error);
      }
      if (data) {
        data = data.map(order => ({
          "id": order.id,
          "date": order.date,
          "label": order.label,
          "itemname": order.Inventory.itemname,
          "orderquantity": order.orderquantity,
          "remaining": order.orderquantity - order.completed,
          "employee": order.Users.empname,
          "completed": 0,
          "completevalue": order.completed,
        }))
        setOrders(data);
      }
    };

    fetch();
    return () => (ignore = true);
  }, []);

  useEffect(() => {
    const subscription = client
      .from('Orders')
      .on("INSERT", async (payload) => {
        const remaining = payload.new.orderquantity - payload.new.completed;
        const employee = await getNameOfUser(payload.new.user_id);
        const itemname = await getNameOfItem(payload.new.productId);
        const newItem = {
          id: payload.new.id,
          date:payload.new.date,
          label:payload.new.label,
          itemname: itemname,
          orderquantity: payload.new.orderquantity,
          remaining: remaining,
          employee: employee,
          completed: 0,
          completevalue: payload.new.completed
        }
        setOrders(orders => [...orders, newItem]);
      })
      .subscribe((status,e)=>{console.log(status,e)})
      return () => {
        client.removeSubscription(subscription);
      }
  }, []);

  return { orders, error };
}

export function useOrderData() {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState(null);
  const [compOrders, setCompOrders] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetch = async () => {
      const { data, error } = await getOrders();
      console.log(data);
      const newData = data.map(order => order.orderquantity - order.completed);
      const newData2 = data.map(order => order.completed);
      if (ignore) return;

      if (error) {
        setError(error);
      }
      if (data) {
        setOrders(newData);
        setCompOrders(newData2);

      }
    };

    fetch();
    return () => (ignore = true);
  }, []);

  return { orders, compOrders, error };
}
