import "./index.css";
import React, { useState, useRef, useEffect } from "react";

export default function DropdownMenu({ value, options, onSelect }) {
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

  return (
    <div className="dropdown">
      <div onClick={handleMenuToggle} className="dropdown-input-box">
        <input value={value} readOnly/>
      </div>
      {isOpen && (
        <ul className="dropdown-menu" ref={menuRef}>
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
