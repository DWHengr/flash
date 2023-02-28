import "./index.css";
import { useState, useEffect } from "react";
import EditableTxt from "../../../components/EditableTxt";
import collocate from "../../../api/collocate";
import { formatDate } from "../../../utils/flash";
export default function Record() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [collocateList, setCollocateList] = useState([]);
  useEffect(() => {
    collocate.list().then((res) => {
      if (res.code == 0) {
        setCollocateList(res.data);
      }
    });
  }, []);

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
                  {item.collocateName}
                </EditableTxt>
                <div className="seek-option-describe">
                  {formatDate(new Date(item.createTime))}
                </div>
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
