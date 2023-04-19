import "./index.css";
import { useSelector } from "react-redux";
import { useState } from "react";
export default function Json() {
  const settingData = useSelector((state) => state.settingData);
  let [jsonData, setJsonData] = useState({
    name: "flash",
    data: ["1", "2"],
  });
  return (
    <div
      className="json-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <div className="json-from-box">{JSON.stringify(jsonData,null, 2)}</div>
      <div className="json-operate-box">
        <div className="json-button">格式化</div>
        <div className="json-button">压缩</div>
      </div>
      <div className="json-to-box"></div>
    </div>
  );
}
