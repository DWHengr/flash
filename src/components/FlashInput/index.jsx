import { useState } from "react";
function FlahsInput(props) {
  const [value, setValue] = useState(props.value);
  return (
    <div className="custom-input-box">
      <input
        type={props.type}
        name={props.name}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange(e);
        }}
        required
      />
      <label>{props.children}</label>
    </div>
  );
}

FlahsInput.defaultProps = {
  type: "text",
};

export default FlahsInput;
