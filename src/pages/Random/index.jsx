import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
export default function Random() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  let [ramData, setRamDataToData] = useState([]);
  let [num, setNum] = useState(1);
  let [minLength, setMinLength] = useState(10);
  let [maxLength, setMaxLength] = useState(15);
  let [charset, setCharset] = useState(
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+"
  );

  let onCreateRam = () => {
    const generatedStrings = [];
    for (let i = 0; i < num; i++) {
      const min = Math.ceil(minLength);
      const max = Math.floor(maxLength);
      const length = Math.floor(Math.random() * (max - min + 1)) + min;

      let randomString = "";
      console.log(length);

      for (let j = 0; j < length; j++) {
        const randomChar = charset[Math.floor(Math.random() * charset.length)];
        randomString += randomChar;
      }
      generatedStrings.push(randomString);
    }
    setRamDataToData(generatedStrings);
  };

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
  }, [searchData.trigger]);

  return (
    <div
      className="ram-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <div className="ram-from-box">
        <div>
          数量：
          <input
            value={num}
            onChange={(e) => {
              let value = e.target.value.replace(/[^\d]/g, "");
              setNum(value > 100 ? 100 : value);
            }}
          ></input>
        </div>
        <div>
          长度：
          <input
            value={minLength}
            onChange={(e) => {
              let value = e.target.value.replace(/[^\d]/g, "");
              if (value < 1) value = 1;
              if (value > 100) value = 100;
              setMinLength(value);
            }}
          ></input>
          ~
          <input
            value={maxLength}
            onChange={(e) => {
              let value = e.target.value.replace(/[^\d]/g, "");
              if (value < 1) value = 1;
              if (value > 100) value = 100;
              setMaxLength(value);
            }}
          ></input>
        </div>
        <div>
          字符集：
          <textarea
            className="ram-charset"
            value={charset}
            onChange={(e) => {
              setCharset(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <div className="ram-operate-box">
        <div className="ram-button" onClick={onCreateRam}>
          生成
        </div>
      </div>
      <textarea className="ram-to-box" value={ramData.join("\n")}></textarea>
    </div>
  );
}
