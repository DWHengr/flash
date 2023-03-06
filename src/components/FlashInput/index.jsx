import "./index.css";
import { useState, useEffect } from "react";
function FlahsInput(props) {
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  return (
    <div
      style={{ width: props.width ? props.width : 200 + "px" }}
      className="custom-input-box"
    >
      <input
        style={{ width: props.width ? props.width : 200 + "px" }}
        type={props.type}
        name={props.name}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange(e);
        }}
        readOnly={props.readOnly}
        required
      />
      {props.readOnly && (
        <label style={{ top: "-20px", color: "#fff", fontSize: "12px" }}>
          {props.children}
        </label>
      )}
      {!props.readOnly && <label>{props.children}</label>}
    </div>
  );
}

FlahsInput.defaultProps = {
  type: "text",
};

export default FlahsInput;
