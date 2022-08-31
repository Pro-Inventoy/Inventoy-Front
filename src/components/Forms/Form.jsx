import { Children, cloneElement } from 'react';
import { useForm } from './useForm.js';

export default function Form({
  data: initialData,
  onSubmit,
  className,
  role = 'form',
  children,
}) {
  const [data, handleChange] = useForm(initialData);
  return (
    <form
      role={role}
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(data);
      }}
    >
      {Children.map(children, (child) => {
        const childOnChange = child.props.onChange;
        const onChange =
          !handleChange || !childOnChange
            ? handleChange || childOnChange
            : (e) => {
                childOnChange(e);
                handleChange(e);
              };

        return cloneElement(child, {
          value: data[child.props.name],
          onChange,
        });
      })}
    </form>
  );
}
