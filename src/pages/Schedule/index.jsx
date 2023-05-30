import { useSelector } from "react-redux";
import "./index.css";
import { useState } from "react";

export default function Schedule() {
  const settingData = useSelector((state) => state.settingData);
  const [isAdd, setIsAdd] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [sceContent, setSceContent] = useState("");
  const [optionMsg, setOptionMsg] = useState("");

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
            <tr>
              <td className="schedule-time-column">
                <div style={{ height: "100%" }}>08:00</div>
                <div style={{ height: "100%" }}>08:00</div>
              </td>
              <td className="schedule-content-column">
                <div className="schedule-content-box">日程内容</div>
              </td>
            </tr>
            <tr>
              <td className="schedule-time-column">
                <div style={{ height: "100%" }}>08:00</div>
                <div style={{ height: "100%" }}>08:00</div>
              </td>
              <td className="schedule-content-column">
                <div className="schedule-content-box">
                  <div>
                    日程内容日程内容日 日程内容
                    日程内容程内容日程内容日程内容日程内容 日程内容 日程内容
                    日程内容 日程内容 日程内容 日程内容 日程内容 日程内容
                    日程内容 日程内容 日程内容 日程内容 日程内容 日程内容
                    日程内容 日程内容 日程
                  </div>
                  <div style={{ float: "left", width: "100%" }}>
                    <div style={{ float: "right" }}>2022-02-03</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="schedule-time-column">
                <div style={{ height: "100%" }}>08:00</div>
                <div style={{ height: "100%" }}>08:00</div>
              </td>
              <td className="schedule-content-column">
                <div className="schedule-content-box">日程内容</div>
              </td>
            </tr>
            <tr>
              <td className="schedule-time-column">
                <div style={{ height: "100%" }}>08:00</div>
                <div style={{ height: "100%" }}>08:00</div>
              </td>
              <td className="schedule-content-column">
                <div className="schedule-content-box">日程内容</div>
              </td>
            </tr>
            <tr>
              <td className="schedule-time-column">
                <div style={{ height: "100%" }}>08:00</div>
                <div style={{ height: "100%" }}>08:00</div>
              </td>
              <td className="schedule-content-column">
                <div className="schedule-content-box">日程内容</div>
              </td>
            </tr>
            <tr>
              <td className="schedule-time-column">
                <div style={{ height: "100%" }}>08:00</div>
                <div style={{ height: "100%" }}>08:00</div>
              </td>
              <td className="schedule-content-column">
                <div className="schedule-content-box">日程内容</div>
              </td>
            </tr>
            <tr>
              <td className="schedule-time-column">
                <div style={{ height: "100%" }}>08:00</div>
                <div style={{ height: "100%" }}>08:00</div>
              </td>
              <td className="schedule-content-column">
                <div className="schedule-content-box">日程内容</div>
              </td>
            </tr>
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
              class="text-input"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            ></input>
          </div>
          <div>
            <div>结束时间:</div>
            <input
              type="datetime-local"
              class="text-input"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            ></input>
          </div>
          <div>
            <div>结束时间:</div>
            <textarea
              style={{ resize: "none", height: 120 }}
              type="text"
              class="text-input "
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
