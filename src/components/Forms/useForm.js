/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export function useForm(initialData) {
  const formData = initialData ?? {};
  const [data, setData] = useState(formData);

  useEffect(() => {
    if (formData === data) return;
    setData(formData);
  }, [initialData]);

  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: getValue(target),
    });
  };

  return [data, handleChange];
}

function getValue(target) {
  const { value, type, checked, form, name } = target;
  if (type === 'checkbox') {
    if (form.querySelectorAll(`[name=${name}]`).length > 1) {
      return new FormData(form).getAll(name);
    }
    return checked;
  }
  return value;
}