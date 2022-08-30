import { Children, cloneElement, forwardRef } from 'react';
import './FormControls.css';

function FormControl({
  label,
  children
}) {

  return (
    <label className="formycontrolly">
      <LabelText text={label} />
      {children}
    </label>
  );
}

function LabelText({ text, as: Tag = 'span' }) {
  if (!text) return null;

  return <Tag >{text}</Tag>;
}

function Option({ text, type, ...rest }) {
  return (
    <label>
      <input type={type} {...rest} />
      {text}
    </label>
  );
}

export function CheckboxOption(props) {
  return <Option type="checkbox" {...props} />;
}

export function RadioOption(props) {
  return <Option type="radio" {...props} />;
}

export function CheckboxControl({ label, ...rest }) {
  return (
    <div>
      <LabelText text={label} />
      <CheckboxOption {...rest} />
    </div>
  );
}

export function OptionGroupControl({
  label,
  name,
  onChange,
  size = '100px',
  children,
}) {
  return (
    <div>
      <fieldset>
        <LabelText text={label} as="legend" />
        <div
          style={{
            gridTemplateColumns: `repeat(
            auto-fill,
            minmax(${size}, 1fr)
          )`,
          }}
        >
          {Children.map(children, (child) =>
            cloneElement(child, { name, onChange })
          )}
        </div>
      </fieldset>
    </div>
  );
}

const verifyValue = (props) => {
  if (Object.prototype.hasOwnProperty.call(props, 'value'))
    props.value = props.value ?? '';
};

export const InputControl = forwardRef((props, ref) => {
  const { label, ...rest } = props;
  verifyValue(rest); 
  return (
    <FormControl className="formycontrolly" label={label}>
      <input ref={ref} {...rest} />
    </FormControl>
  );
}
);

InputControl.displayName = 'InputControl';


export const SelectControl = forwardRef((props, ref) => {
  const { label, children, ...rest } = props;
  verifyValue(rest);

  return (
    <FormControl label={label}>
      <select ref={ref} {...rest}>
        {children}
      </select>
    </FormControl>
  );
});

SelectControl.displayName = 'SelectControl';

export const TextAreaControl = forwardRef((props, ref) => {
  const { label, ...rest } = props;
  verifyValue(rest);
  return (
    <FormControl label={label}>
      <textarea ref={ref} {...rest}></textarea>
    </FormControl>
  );
});

TextAreaControl.displayName = 'TextAreaControl';

export function FormButton({
  children,
  ...rest
}) {


  return (
    <button {...rest}>
      {children}
    </button>
  );
}

export function FormButtonControl(props) {
  return <FormButton {...props} />;
}

export function Fieldset({ legend, children }) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}
