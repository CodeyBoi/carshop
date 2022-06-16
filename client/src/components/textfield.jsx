import React from "react";
import "./styles.css";

/**
 * Mostly self-written conditionally styled text input field. Inspired by:
 * https://medium.com/@whwrd/building-a-beautiful-text-input-component-in-react-f85564cc7e86.
 */
const TextField = (props) => {

  // States to manage the conditional field styling
  const [active, setActive] = React.useState(false);
  // const [error, setError] = React.useState(props.error || '');
  const error = props.error || '';  

  const label = props.label || 'Label';

  const onChange = event => {
    event.preventDefault();
    props.onChange(event.target.value);
  }

  const locked = props.locked || false;
  const val = props.value || '';
  const { id } = props;
  const fieldClassName = `field ${(locked ? active : active || val)
    && "active"} ${locked && !active && "locked"}`;

  return (
    <div className={fieldClassName}>
      <input
        id={id}
        value={val}
        type={props.type === 'password' ? 'password' : 'text'}
        onChange={onChange}
        onFocus={() => !locked && setActive(true)}
        onBlur={() => !locked && setActive(false)}
      />
      <label htmlFor={id} className={error && "error"}>
        {error || label}
      </label>
    </div>
  );
}

export default TextField;