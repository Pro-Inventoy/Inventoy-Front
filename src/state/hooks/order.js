import { RealtimeClient } from '@supabase/supabase-js';
import { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../context/orderContext.jsx';
import client from '../services/client.js';
import { getNameOfItem } from '../services/inventory-service.js';
import {
  getOrders,
  addOrder,
  updateOrder,
  removeOrder
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
    client
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
        console.log('the new item', newItem);
        setOrders(orders => [...orders, newItem]);
      })
      .subscribe((status,e)=>{console.log(status,e)})
      return () => {
      }
  }, []);

  return { orders, error };
}

function createDispatchActions(dispatch) {
  return function createAction({ service, type, success }) {
    return async (...args) => {
      const { data, error } = await service(...args);

      if (error) console.log(error.message);

      if (data) {
        dispatch({ type, payload: data });
        const successMessage = success(data);
        console.log(successMessage);
      }
    };
  };
}

export function useOrderActions() {
  const { orderDispatch } = useContext(OrderContext);

  const createAction = createDispatchActions(orderDispatch);

  const add = createAction({
    service: addOrder,
    type: 'add',
    success: (data) => `Added ${data.ordername}`,
  });

  const update = createAction({
    service: updateOrder,
    type: 'update',
    success: (data) => `Updated ${data.ordername}`,
  });

  const remove = createAction({
    service: removeOrder,
    type: 'remove',
    success: (data) => `Removed ${data.ordername}`,
  });
  return { add, update, remove };
}
