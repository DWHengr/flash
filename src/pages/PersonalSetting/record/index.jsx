import "./index.css";
import { useState } from "react";
import EditableTxt from "../../../components/EditableTxt";
export default function Record() {
  const [currentIndex, setCurrentIndex] = useState(0);
  let collocateList = [
    {
      name: "测试",
      time: "2022-1-12 22:22:22",
    },
    {
      name: "测试",
      time: "2022-1-12 22:22:22",
    },
    {
      name: "测试",
      time: "2022-1-12 22:22:22",
    },
    {
      name: "测试",
      time: "2022-1-12 22:22:22",
    },
    {
      name: "测试",
      time: "2022-1-12 22:22:22",
    },
    {
      name: "测试",
      time: "2022-1-12 22:22:22",
    },
    {
      name: "测试",
      time: "2022-1-12 22:22:22",
    },
    {
      name: "测试",
      time: "2022-1-12 22:22:22",
    },
    {
      name: "测试",
      time: "时间",
    },
  ];
  return (
    <div>
      <div style={{ overflowY: "scroll", height: "350px" }}>
        {collocateList?.map((item, index) => {
          return (
            <div
              key={index}
              className="seek-option "
              onClick={() => {
                setCurrentIndex(index);
              }}
              style={{
                backgroundColor: index == currentIndex ? "rgb(78, 78, 78)" : "",
                position: "relative",
              }}
            >
              <div style={{ display: "inline-block", marginLeft: "8px" }}>
                <EditableTxt
                  className="seek-option-name"
                  onBlur={(e, f) => console.log(e, f)}
                >
                  {item.name}
                </EditableTxt>
                <div className="seek-option-describe">{item.time}</div>
              </div>
              <div className="option-operate-icon">
                <i
                  style={{ fontSize: 20, marginRight: 5 }}
                  className="option-add-bar-button-icon iconfont icon-yunxiazai"
                />
                <i
                  style={{ fontSize: 20, marginRight: 5 }}
                  className="option-add-bar-button-icon iconfont icon-shanchu"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
