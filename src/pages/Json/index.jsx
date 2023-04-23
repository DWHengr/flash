import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ReactJson from "react-json-view";
export default function Json() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  let [model, setModel] = useState("");
  let [jsonFromData, setJsonFromData] = useState("");
  let [jsonToData, setJsonToData] = useState({});
  let onFormat = () => {
    setModel("format");
    let data = JSON.parse(jsonFromData);
    setJsonToData(data);
  };

  let onCompress = () => {
    setModel("compress");
    let data = JSON.parse(jsonFromData);
    data = JSON.stringify(data);
    setJsonToData(data);
  };

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    setJsonFromData(searchData.searchValue);
  }, [searchData.trigger]);

  let jsonTheme = {
    base00: "",
    base01: "",
    base02: "",
    base03: "",
    base04: "purple",
    base05: "",
    base06: "",
    base07: "",
    base08: "",
    base09: "",
    base0A: "",
    base0B: "",
    base0C: "",
    base0D: "",
    base0E: "rgba(70, 70, 230, 1)",
    base0F: "",
  };
  return (
    <div
      className="json-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <textarea
        className="json-from-box"
        value={jsonFromData}
        onChange={(e) => {
          setJsonFromData(e.target.value);
        }}
      ></textarea>
      <div className="json-operate-box">
        <div className="json-button" onClick={onFormat}>
          格式化
        </div>
        <div className="json-button" onClick={onCompress}>
          压缩
        </div>
      </div>
      <div className="json-to-box">
        {model == "format" && (
          <ReactJson
            style={{ fontFamily: "sans-serif" }}
            name={false}
            displayDataTypes={false}
            src={jsonToData}
            theme={jsonTheme}
          ></ReactJson>
        )}
        {model == "compress" && (
          <div style={{ wordWrap: "break-word" }}>{jsonFromData}</div>
        )}
      </div>
    </div>
  );
}
