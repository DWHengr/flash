import { useSelector } from "react-redux";
import "./index.css";
import { useState } from "react";

export default function Schedule() {
  const settingData = useSelector((state) => state.settingData);
  const [isAdd, setIsAdd] = useState(false);

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
            <input type="datetime-local" class="text-input "></input>
          </div>
          <div>
            <div>结束时间:</div>
            <input type="datetime-local" class="text-input "></input>
          </div>
          <div>
            <div>结束时间:</div>
            <textarea
              style={{ resize: "none", height: 120 }}
              type="text"
              class="text-input "
              placeholder="请输入日程内容"
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
}
