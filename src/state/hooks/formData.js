import { useState } from 'react';

export function useForm(){
  const [data, setData] = useState({});

  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: getValue(target),
    });
  };
  return[data, handleChange];
}

function getValue({ value, type, checked }) {
  if (type === 'checkbox') return checked;
  return value;
}
