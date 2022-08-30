import { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../context/inventoryContext.jsx';
import {
  getItems,
  addItem,
  updateItem,
  removeItem,
  getCategories,
} from '../services/inventory-service.js';

export function useItems() {
  const [error, setError] = useState(null);
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetch = async () => {
      const { data, error } = await getItems();
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
  return categories;
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

export function useItemActions() {
  const { itemDispatch } = useContext(ItemContext);

  const createAction = createDispatchActions(itemDispatch);

  const add = createAction({
    service: addItem,
    type: 'add',
    success: (data) => `Added ${data.itemname}`,
  });

  const update = createAction({
    service: updateItem,
    type: 'update',
    success: (data) => `Updated ${data.itemname}`,
  });

  const remove = createAction({
    service: removeItem,
    type: 'remove',
    success: (data) => `Removed ${data.itemname}`,
  });
  return { add, update, remove };
}
