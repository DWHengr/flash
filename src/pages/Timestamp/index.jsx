import FlashInput from "../../components/FlashInput";
import { formatDateTime } from "../../utils/date";
import "./index.css";
import React, { useState, useEffect } from "react";
export function Timestamp() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [timestamp1, setTimestamp1] = useState(Date.now());
  const [time1, setTimes1] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onToTime = () => {
    setTimes1(formatDateTime(timestamp1));
  };

  return (
    <div className="tip-box">
      <div>当前时间戳：{timestamp}</div>
      <div
        style={{
          display: "flex",
          height: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        时间戳:
        <input
          className="tip-text-input"
          value={timestamp1}
          onChange={(e) => setTimestamp1(e.target.value)}
        ></input>
        毫秒(ms)
        <div className="tip-option">
          <label onClick={onToTime} className="tip-option-label">
            转换
          </label>
        </div>
        <input className="tip-text-input" value={time1} readOnly></input>
      </div>
    </div>
  );
}
