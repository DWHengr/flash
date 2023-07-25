import "./index.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as prettier from "prettier/standalone";
import pluginHtml from "prettier/plugins/html";
import pluginBabel from "prettier/plugins/babel";
import pluginPostCss from "prettier/plugins/postcss";

export default function Html() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  let [fromData, setFromData] = useState("");
  let [toData, setToData] = useState("");

  let onHtmlToFormat = async () => {
    const formattedHtml = await prettier.format(fromData, {
      semi: false,
      parser: "vue",
      plugins: [pluginHtml, pluginBabel, pluginPostCss],
    });
    setToData(formattedHtml);
  };

  const compress = (str) => {
    const compressed = str.replace(/\s+/g, "");
    return compressed;
  };

  let onHtmlCompress = () => {
    setToData(compress(fromData));
  };

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
  }, [searchData.trigger]);

  return (
    <div
      className="html-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <textarea
        className="html-from-box"
        value={fromData}
        onChange={(e) => {
          setFromData(e.target.value);
        }}
      ></textarea>
      <div className="html-operate-box">
        <div className="html-button" onClick={onHtmlToFormat}>
          格式化
        </div>
        <div className="html-button" onClick={onHtmlCompress}>
          压缩
        </div>
      </div>
      <textarea
        className="html-to-box"
        value={toData}
        onChange={(e) => {
          setToData(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
