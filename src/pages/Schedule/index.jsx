import { useSelector } from "react-redux";
import "./index.css";
import { useState, useEffect } from "react";
import { formatDate, getHourAndMinute } from "../../utils/date";
import Dexie from "dexie";

export default function Schedule() {
  const settingData = useSelector((state) => state.settingData);
  const [isAdd, setIsAdd] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [sceContent, setSceContent] = useState("");
  const [optionMsg, setOptionMsg] = useState("");
  const [sceDatas, setSceDatas] = useState([]);

  const db = new Dexie("flashDB");
  db.version(1).stores({
    schedules: "++id,startTime,endTime,sceContent",
  });

  useEffect(() => {
    db.schedules.toArray().then((data) => {
      setSceDatas(data);
    });
  }, []);

  const onAddSce = () => {
    setOptionMsg("");
    if (!startTime) {
      setOptionMsg("开始时间不能为空");
      return;
    }
    if (!endTime) {
      setOptionMsg("结束时间不能为空");
      return;
    }
    if (!sceContent) {
      setOptionMsg("日程内容不能为空");
      return;
    }
    setStartTime("");
    setEndTime("");
    setSceContent("");
    const sceData = {
      startTime: formatDate(startTime),
      endTime: formatDate(endTime),
      sceContent,
    };
    sceDatas.push(sceData);
    db.schedules.add(sceData);
    setSceDatas(sceDatas);
  };

  return (
    <div
      className="schedule-box"
      style={{
        height: settingData.windowHeight - settingData.searchBoxHeight - 20,
      }}
    >
      <div className="schedule-table-box">
        <table className="schedule-table">
          <thead>
            <tr>
              <th className="schedule-time-column">时间</th>
              <th className="schedule-content-column">日程内容</th>
            </tr>
          </thead>
          <tbody>
            {sceDatas.map((sce, index) => {
              return (
                <tr key={index}>
                  <td className="schedule-time-column">
                    <div style={{ height: "100%" }}>
                      {getHourAndMinute(sce.startTime)}
                    </div>
                    <div
                      style={{
                        height: "100%",
                        fontSize: 12,
                        color: "rgb(115, 115, 115)",
                      }}
                    >
                      {getHourAndMinute(sce.endTime)}
                    </div>
                  </td>
                  <td className="schedule-content-column">
                    <div className="schedule-content-box">
                      <div>{sce.sceContent}</div>
                    </div>
                    <div style={{ float: "right", fontSize: 10 }}>
                      {sce.startTime} - {sce.endTime}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        className="schedule-add-btn"
        onClick={() => {
          setIsAdd(!isAdd);
        }}
      >
        添加日程
      </div>
      {isAdd && (
        <div className="schedule-add-box ">
          <div>
            <div>开始时间:</div>
            <input
              type="datetime-local"
              className="text-input"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            ></input>
          </div>
          <div>
            <div>结束时间:</div>
            <input
              type="datetime-local"
              className="text-input"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            ></input>
          </div>
          <div>
            <div>结束时间:</div>
            <textarea
              style={{ resize: "none", height: 120 }}
              type="text"
              className="text-input "
              value={sceContent}
              onChange={(e) => setSceContent(e.target.value)}
              placeholder="请输入日程内容"
            ></textarea>
          </div>
          <div style={{ marginTop: 2 }}>
            <div style={{ color: "#FCDA01", display: "inline-block" }}>
              {optionMsg}
            </div>
            <i
              style={{ fontSize: 20, float: "right" }}
              onClick={onAddSce}
              className="option-add-bar-button-icon iconfont icon-chuli"
            />
          </div>
        </div>
      )}
    </div>
  );
}
