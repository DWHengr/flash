import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import YAML from "yaml";
import yaml from "js-yaml";

export default function Yml() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  let [fromData, setFromData] = useState("");
  let [toData, setToData] = useState("");

  let onJsonToYml = () => {
    setToData(yaml.dump(JSON.parse(fromData)));
  };

  let onYmlToJson = () => {
    setToData(JSON.stringify(YAML.parse(fromData), null, 2));
  };

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
  }, [searchData.trigger]);

  return (
    <div
      className="yml-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <textarea
        className="yml-from-box"
        value={fromData}
        onChange={(e) => {
          setFromData(e.target.value);
        }}
      ></textarea>
      <div className="yml-operate-box">
        <div className="yml-button" onClick={onYmlToJson}>
          json
        </div>
        <div className="yml-button" onClick={onJsonToYml}>
          yml
        </div>
      </div>
      <textarea
        className="yml-to-box"
        value={toData}
        onChange={(e) => {
          setToData(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
