import { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../context/orderContext.jsx';
import {
  getOrders,
  addOrder,
  updateOrder,
  removeOrder
} from '../services/order-service.js';

export function useOrders() {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetch = async () => {
      const { data, error } = await getOrders();
      if (ignore) return;

      if (error) {
        setError(error);
      }
      if (data) {
        setOrders(data);
      }
    };

    fetch();
    return () => (ignore = true);
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
