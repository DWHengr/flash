import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Uuid() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  const [count, setCount] = useState(1);
  const [uuids, setUUIDs] = useState([]);

  const onGenerateUUIDs = (count) => {
    const generatedUUIDs = [];
    for (let i = 0; i < count; i++) {
      generatedUUIDs.push(uuidv4());
    }
    setUUIDs(generatedUUIDs);
  };

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    let isNumber = /^\d+$/.test(searchData.searchValue);
    if (isNumber) {
      setCount(searchData.searchValue);
    } else {
      setCount(1);
    }
    onGenerateUUIDs(parseInt(searchData.searchValue));
  }, [searchData.trigger]);

  return (
    <div
      className="uuid-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <div className="uuid-bar">
        <div style={{ position: "relative" }}>
          <div
            style={{ display: "inline-block", marginLeft: 10, marginRight: 10 }}
          >
            数量:
            <input
              value={count}
              onChange={(e) => {
                setCount(e.target.value);
              }}
            ></input>
          </div>
          <div
            className="uuid-button"
            onClick={() => onGenerateUUIDs(parseInt(count))}
          >
            生成
          </div>
        </div>
      </div>
      <textarea className="uuid-to-box" value={uuids.join("\n")}></textarea>
    </div>
  );
}
