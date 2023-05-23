import { useSelector } from "react-redux";
import "./index.css";

export default function Schedule() {
  const settingData = useSelector((state) => state.settingData);

  return (
    <div
      className="schedule-box"
      style={{
        height: settingData.windowHeight - settingData.searchBoxHeight - 20,
      }}
    >
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
        </tbody>
      </table>
      <div>添加日程</div>
    </div>
  );
}
