import "./index.css";
import React, { useState, useRef, useEffect } from "react";

export default function DropdownMenu({
  value,
  options,
  width,
  readOnly,
  onChange,
  onSelect,
  onKeyDown,
  onBlur,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setIsOpen(false);
    onSelect(option);
  };

  function handleInputChange(event) {
    if (typeof onChange === "function") {
      onChange(event);
    }
  }

  function handleOnBlur(event) {
    if (typeof onBlur === "function") {
      onBlur(event);
    }
  }

  function handleOnKeyDown(event) {
    if (typeof onKeyDown === "function") {
      onKeyDown(event);
    }
  }

  return (
    <div className="dropdown" style={{ width: "185px" }}>
      <div onClick={handleMenuToggle} className="dropdown-input-box">
        <input
          style={{ width: (width ? width : 200) + "px" }}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleOnKeyDown}
          onBlur={handleOnBlur}
          readOnly={readOnly}
        />
      </div>
      {isOpen && options && (
        <ul
          className="dropdown-menu"
          style={{ width: (width ? width : 200) + "px" }}
          ref={menuRef}
        >
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
