import "./index.css";
import { useState, useEffect } from "react";
import EditableTxt from "../../../components/EditableTxt";
import collocate from "../../../api/collocate";
import { formatDate } from "../../../utils/flash";
import { useLoading } from "../../../components/Loading";
import { initOptionData } from "../../../store/option/action";
import { initSettingData } from "../../../store/setting/action";
import { setOptionIcon } from "../../../utils/flash";
import { useDispatch } from "react-redux";
import { updateConfig } from "../../../utils/command";
import Dialog from "../../../components/Dialog";
export default function Record() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [collocateList, setCollocateList] = useState([]);
  const [operationMsg, setOperationMsg] = useState("");
  const [deleteData, setDeleteData] = useState({});
  const loading = useLoading();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    loading.showLoading("加载同步记录中...");
    collocate
      .list()
      .then((res) => {
        if (res.code == 0) {
          setCollocateList(res.data);
        }
      })
      .finally(() => {
        setTimeout(() => {
          loading.hideLoading();
        }, 500);
      });
  }, []);

  const handleOnDelete = (item, index) => {
    setOperationMsg("");
    collocate
      .deletes([item.id])
      .then((res) => {
        if (res.code == 0) {
          const newCllocateList = collocateList.filter(
            (item, i) => i !== index
          );
          console.log(newCllocateList);
          setCollocateList(newCllocateList);
        } else {
          setOperationMsg("删除失败");
        }
      })
      .catch(() => {
        setOperationMsg("删除失败");
      });
  };

  const handleOnUpdate = (item, index, value) => {
    setOperationMsg("");
    collocate
      .update({ id: item.id, collocateName: value })
      .then((res) => {
        if (res.code != 0) setOperationMsg("修改失败");
      })
      .catch(() => {
        setOperationMsg("修改失败");
      });
  };

  const handleOnDownLoad = (item) => {
    setOperationMsg("");
    loading.showLoading("应用中...");
    collocate
      .info(item.id)
      .then(async (res) => {
        if (res.code == 0) {
          let config = JSON.parse(res.data.collocateContents);
          await optionIcon(config.option);
          dispatch(initOptionData(config.option));
          dispatch(initSettingData(config.setting));
          updateConfig(config.option, config.setting).then(async (res) => {
            if (res) {
              console.log(res);
            }
          });
        } else {
          setOperationMsg("应用失败");
        }
      })
      .catch(() => {
        setOperationMsg("应用失败");
      })
      .finally(() => {
        setTimeout(() => {
          loading.hideLoading("应用完成");
        }, 500);
      });
  };

  const optionIcon = async (options) => {
    for (let index = 0; index < options?.length; index++) {
      let o = options[index];
      setOptionIcon(o);
    }
  };

  return (
    <div>
      <div className="option-bar">
        <div
          style={{
            position: "absolute",
            left: "80px",
            lineHeight: "40px",
            display: "inline-block",
            color: "#FCDA01",
          }}
        >
          {operationMsg}
        </div>
        <div>同步记录</div>
      </div>
      <Dialog
        tip="确认删除?"
        visible={visible}
        onVisible={(visible) => setVisible(visible)}
        onOk={() => {
          handleOnDelete(deleteData.item, deleteData.index);
        }}
      />
      {(collocateList.length == 0 || !collocateList) && <div>暂无同步记录</div>}
      <div style={{ overflowY: "scroll", height: "312px" }}>
        {collocateList?.map((item, index) => {
          return (
            <div
              key={item.id}
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
                  onBlur={(e, f) => {
                    if (f) {
                      handleOnUpdate(item, index, e.target.value);
                    }
                  }}
                >
                  {item.collocateName}
                </EditableTxt>
                <div className="seek-option-describe">
                  {formatDate(new Date(item.createTime))}
                </div>
              </div>
              <div className="option-operate-icon">
                <i
                  onClick={() => handleOnDownLoad(item)}
                  style={{ fontSize: 20, marginRight: 5 }}
                  className="option-add-bar-button-icon iconfont icon-yunxiazai"
                />
                <i
                  onClick={() => {
                    setDeleteData({ item, index });
                    setVisible(true);
                  }}
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
