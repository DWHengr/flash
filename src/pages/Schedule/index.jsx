import { useSelector } from "react-redux";
import "./index.css";
import { useState, useEffect } from "react";
import { formatDate, getHourAndMinute } from "../../utils/date";
import db from "../../utils/db";
import Dialog from "../../components/Dialog";

export default function Schedule() {
  const settingData = useSelector((state) => state.settingData);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [sceContent, setSceContent] = useState("");
  const [optionMsg, setOptionMsg] = useState("");
  const [sceDatas, setSceDatas] = useState([]);
  const [visible, setVisible] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [editData, setEditData] = useState({});

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
    if (isEdit) {
      sceData.id = editData.id;
      db.schedules.put(sceData);
    } else {
      db.schedules.add(sceData);
    }
    db.schedules.toArray().then((data) => {
      setSceDatas(data);
    });
    setIsAdd(false);
  };

  return (
    <div
      className="schedule-box"
      style={{
        height: settingData.windowHeight - settingData.searchBoxHeight - 20,
      }}
    >
      <Dialog
        tip="确认删除?"
        visible={visible}
        onVisible={(visible) => setVisible(visible)}
        onOk={() => {
          db.schedules.where("id").equals(deleteData.id).delete();
          db.schedules.toArray().then((data) => {
            setSceDatas(data);
          });
        }}
      />
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
                    <div
                      className="schedule-content-box"
                      onDoubleClick={() => {
                        setEndTime(sce.endTime);
                        setStartTime(sce.startTime);
                        setSceContent(sce.sceContent);
                        setEditData({ id: sce.id });
                        setIsAdd(true);
                        setIsEdit(true);
                      }}
                    >
                      <div>{sce.sceContent}</div>
                    </div>
                    <div style={{ float: "right", fontSize: 10 }}>
                      {sce.startTime} - {sce.endTime}
                      <i
                        onClick={() => {
                          setDeleteData({ id: sce.id });
                          setVisible(true);
                        }}
                        style={{ fontSize: 14, marginLeft: 8 }}
                        className="option-add-bar-button-icon iconfont icon-shanchu"
                      />
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
          setIsEdit(false);
          setEndTime("");
          setStartTime("");
          setSceContent("");
        }}
      >
        {isAdd ? "取消" : "添加日程"}
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
