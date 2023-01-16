import "./index.css";
import "./iconfont.css";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function Option() {
  const [isCreateOption, setIsCreateOption] = useState(false);
  const optionData = useSelector((state) => state.optionData);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div style={{ height: 350 }}>
      <div className="create-box">
        {isCreateOption && (
          <div style={{ height: 160, background: "rgba(27, 27, 27, 0.9)" }}>
            选项设置
            <div className="option">
              <div className="option-key">名称：</div>
              <div className="option-value input-box">
                <input />
              </div>
            </div>
            <div className="option">
              <div className="option-key">打开方式：</div>
              <div className="option-value input-box">
                <input />
              </div>
            </div>
            <div className="option">
              <div className="option-key">类型：</div>
              <div className="option-value input-box">
                <input />
              </div>
            </div>
            <div className="option">
              <div className="option-key">路径：</div>
              <div className="option-value input-box">
                <input />
              </div>
            </div>
            <div className="option">
              <div className="option-key">描述：</div>
              <div className="option-value input-box">
                <input />
              </div>
            </div>
          </div>
        )}
        <div className="option-add-bar">
          <div className="option-add-bar-button">
            {!isCreateOption && (
              <i
                onClick={() => {
                  setIsCreateOption(true);
                }}
                style={{ fontSize: 30 }}
                className="option-add-bar-button-icon iconfont icon-zhankai"
              />
            )}
            {isCreateOption && (
              <div style={{ weith: "100%", position: "relative" }}>
                <i
                  onClick={() => {
                    setIsCreateOption(false);
                  }}
                  style={{ fontSize: 30 }}
                  className="option-add-bar-button-icon iconfont icon-shouqi"
                />
                <div
                  style={{
                    position: "absolute",
                    right: "85px",
                    display: "inline-block",
                  }}
                >
                  <i
                    style={{ fontSize: 20, marginRight: 5 }}
                    className="option-add-bar-button-icon iconfont icon-bohui"
                  />
                  <i
                    style={{ fontSize: 20 }}
                    className="option-add-bar-button-icon iconfont icon-chuli"
                  />
                </div>
              </div>
            )}
            <div
              style={{
                overflowY: "scroll",
                height: isCreateOption ? 150 : 310,
              }}
            >
              {optionData?.currentDataList?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="seek-option"
                    onClick={() => {
                      setCurrentIndex(index);
                    }}
                    style={{
                      backgroundColor:
                        index == currentIndex ? "rgb(78, 78, 78)" : "",
                    }}
                  >
                    <img src={item.icon} className="seek-option-icon" />
                    <div style={{ display: "inline-block" }}>
                      <div className="seek-option-name">{item.name}</div>
                      <div className="seek-option-describe">
                        {item.describe}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
