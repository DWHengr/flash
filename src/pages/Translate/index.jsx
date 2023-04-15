import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import translate from "../../api/translate";
import { isChinese } from "../../utils/flash";
export default function Translate() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);
  const [content, setContent] = useState("");
  const [translateContent, setTranslateContent] = useState("");
  const [from, setFrom] = useState("cn");
  const [to, setTo] = useState("en");

  const contentTranslate = (content) => {
    let from = "cn";
    let to = "en";
    if (!isChinese(content)) {
      from = "en";
      to = "cn";
    }
    setFrom(from);
    setTo(to);
    translate.translate({ text: content, from: from, to: to }).then((res) => {
      if (res.code == 0) {
        setTranslateContent(res.data.result.trans_result.dst);
      }
    });
  };

  const onTranslate = () => {
    contentTranslate(content);
  };

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    setContent(searchData.searchValue);
    contentTranslate(searchData.searchValue);
  }, [searchData.trigger]);

  return (
    <div
      className="translate-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <textarea
        className="translate-from-box"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <div className="translate-bar">
        <div style={{ position: "relative" }}>
          <div className="translate-button" onClick={onTranslate}>
            翻译
          </div>
          <div className="translate-from-to">
            {from} to {to}
          </div>
        </div>
      </div>
      <div className="translate-to-box">{translateContent}</div>
    </div>
  );
}
