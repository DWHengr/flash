import "./index.css";
import React, { useState, useEffect } from "react";
export function Timestamp() {
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <div>当前时间戳：{timestamp}</div>
    </div>
  );
}
