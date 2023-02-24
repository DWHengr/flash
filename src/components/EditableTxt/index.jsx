import "./index.css";
import { useState, useEffect, useRef } from "react";

function EditableTxt({ children, className, onChange, onBlur }) {
  const [content, setContent] = useState(children);
  const [contentOld, setContentOld] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  function handleDoubleClick() {
    setIsEditing(true);
  }

  function handleBlur(event) {
    setIsEditing(false);
    if (!content) setContent(contentOld);
    if (typeof onBlur === "function") {
      onBlur(event, content !== contentOld);
    }
    setContentOld(content);
  }

  function handleChange(event) {
    setContent(event.target.value);
    if (typeof onChange === "function") {
      onChange(event);
    }
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      className={`${className} editalbe-txt`}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
    >
      {isEditing ? (
        <input
          type="text"
          value={content}
          onChange={handleChange}
          ref={inputRef}
        />
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
}

export default EditableTxt;
