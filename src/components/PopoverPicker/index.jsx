import "./index.css";
import useClickOutside from "./useClickOutside";
import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

export const PopoverPicker = ({ color, onChange, style }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="pp-picker" style={style}>
      <div
        className="pp-swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className="pp-popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
