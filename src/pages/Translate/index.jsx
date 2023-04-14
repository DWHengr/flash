import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
export default function Translate() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    console.log(searchData);
    setContent(searchData.searchValue);
  }, [searchData.trigger]);

  return (
    <div
      className="translate-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <div className="translate-from-box" contenteditable="true">
        {content}
      </div>
      <div className="translate-bar" >
        <div className="translate-button">翻译</div>
      </div>
      <div className="translate-to-box"></div>
    </div>
  );
}
