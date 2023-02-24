import "./index.css";
import { useState } from "react";
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
      time: "2022-1-12 22:22:22",
    }
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
                <div className="seek-option-name">{item.name}</div>
                <div className="seek-option-describe">{item.time}</div>
              </div>
              <div className="option-operate-icon">
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
