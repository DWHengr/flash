import "./index.css";
import "./iconfont.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addOption,
  deleteOption,
  editOption,
} from "../../../store/option/action";
import { setOptionIcon } from "../../../utils/flash";
import { updateConfig } from "../../../utils/command";
import collocate from "../../../api/collocate";
import { useLoading } from "../../../components/Loading";
import DropdownMenu from "../../../components/DropdownMenu";

export default function Option() {
  const [isCreateOption, setIsCreateOption] = useState(false);
  const [isEditOption, setIsEditOption] = useState(false);
  const optionData = useSelector((state) => state.optionData);
  const settingData = useSelector((state) => state.settingData);
  const userDate = useSelector((state) => state.userData);
  const allDataList = useSelector((state) => state.optionData.allDataList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [operationMsg, setOperationMsg] = useState("");
  const [optionInfo, setOptionInfo] = useState({
    name: "",
    option_type: "",
    open_in: "",
    path: "",
    describe: "",
  });
  const dispatch = useDispatch();
  const loading = useLoading();

  const optionInfoHandleChange = (event) => {
    const { name, value } = event.target;
    setOptionInfo({ ...optionInfo, [name]: value });
  };

  useEffect(() => {
    updateConfig(optionData, settingData).then(async (res) => {
      if (res) {
        console.log(res);
      }
    });
  }, [allDataList]);

  const onOptionInfoReset = () => {
    setOptionInfo({
      name: "",
      option_type: "",
      open_in: "",
      path: "",
      describe: "",
    });
  };

  const onUploadCloud = () => {
    let config = {
      option: optionData,
      setting: settingData,
    };
    loading.showLoading("上传中...");
    collocate
      .create({ collocateContents: JSON.stringify(config) })
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        setTimeout(() => {
          loading.hideLoading();
        }, 1000);
      });
  };

  return (
    <div style={{ height: 350 }}>
      <div className="create-box">
        {isCreateOption && (
          <div style={{ height: 160, background: "rgba(27, 27, 27, 0.9)" }}>
            选项设置
            <div className="option">
              <div className="option-key">名称：</div>
              <div className="option-value input-box">
                <input
                  name="name"
                  onChange={optionInfoHandleChange}
                  value={optionInfo.name}
                />
              </div>
            </div>
            <div className="option">
              <div className="option-key">类型：</div>
              <div className="option-value input-box">
                <DropdownMenu
                  onSelect={(value) => {
                    setOptionInfo({ ...optionInfo, option_type: value });
                  }}
                  value={optionInfo.option_type}
                  options={["link", "file", "project", "app", "folder"]}
                ></DropdownMenu>
              </div>
            </div>
            <div className="option">
              <div className="option-key">打开方式：</div>
              <div className="option-value input-box">
                <input
                  name="open_in"
                  onChange={optionInfoHandleChange}
                  value={optionInfo.open_in}
                />
              </div>
            </div>
            <div className="option">
              <div className="option-key">路径：</div>
              <div className="option-value input-box">
                <input
                  name="path"
                  onChange={optionInfoHandleChange}
                  value={optionInfo.path}
                />
              </div>
            </div>
            <div className="option">
              <div className="option-key">描述：</div>
              <div className="option-value input-box">
                <input
                  name="describe"
                  onChange={optionInfoHandleChange}
                  value={optionInfo.describe}
                />
              </div>
            </div>
          </div>
        )}
        <div className="option-add-bar">
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
          <div className="option-add-bar-button">
            <div style={{ weith: "100%", position: "relative" }}>
              {!isCreateOption && (
                <div>
                  <i
                    onClick={() => {
                      setOperationMsg("");
                      setIsCreateOption(true);
                      setIsEditOption(false);
                      onOptionInfoReset();
                    }}
                    style={{ fontSize: 30 }}
                    className="option-add-bar-button-icon iconfont icon-zhankai"
                  />
                  <div
                    style={{
                      position: "absolute",
                      right: "3px",
                      display: "inline-block",
                    }}
                  >
                    {userDate?.isLogin && (
                      <i
                        style={{ fontSize: 28, marginRight: 5 }}
                        onClick={onUploadCloud}
                        className="option-add-bar-button-icon iconfont icon-yunshangchuan"
                      />
                    )}
                  </div>
                </div>
              )}
              {isCreateOption && (
                <div>
                  <i
                    onClick={() => {
                      setOperationMsg("");
                      setIsCreateOption(false);
                      setIsEditOption(false);
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
                      onClick={() => {
                        setOperationMsg("");
                        onOptionInfoReset();
                      }}
                      style={{ fontSize: 20, marginRight: 5 }}
                      className="option-add-bar-button-icon iconfont icon-bohui"
                    />
                    <i
                      style={{ fontSize: 20 }}
                      onClick={async () => {
                        setOperationMsg("");
                        if (!optionInfo.name) {
                          setOperationMsg("名称不能为空");
                          return;
                        }
                        if (!optionInfo.option_type) {
                          setOperationMsg("类型不能为空");
                          return;
                        }
                        if (!optionInfo.path) {
                          setOperationMsg("路径不能为空");
                          return;
                        }
                        await setOptionIcon(optionInfo);
                        if (isEditOption)
                          dispatch(editOption(currentIndex, optionInfo));
                        else dispatch(addOption(optionInfo));
                      }}
                      className="option-add-bar-button-icon iconfont icon-chuli"
                    />
                  </div>
                </div>
              )}
            </div>
            <div
              style={{
                overflowY: "scroll",
                height: isCreateOption ? 150 : 310,
              }}
            >
              {optionData?.allDataList?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="seek-option "
                    onClick={() => {
                      setCurrentIndex(index);
                      if (isEditOption) {
                        setOptionInfo({ ...item });
                      }
                    }}
                    style={{
                      backgroundColor:
                        index == currentIndex ? "rgb(78, 78, 78)" : "",
                      position: "relative",
                    }}
                  >
                    <img src={item.icon} className="seek-option-icon" />
                    <div style={{ display: "inline-block" }}>
                      <div className="seek-option-name">{item.name}</div>
                      <div className="seek-option-describe">
                        {item.describe}
                      </div>
                    </div>
                    <div className="option-operate-icon">
                      <i
                        onClick={() => {
                          setOperationMsg("");
                          setIsCreateOption(true);
                          setIsEditOption(true);
                          setOptionInfo({ ...item });
                        }}
                        style={{ fontSize: 20, marginRight: 5 }}
                        className="option-add-bar-button-icon iconfont icon-wenbenshuru"
                      />
                      <i
                        onClick={() => {
                          dispatch(deleteOption(index));
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
        </div>
      </div>
    </div>
  );
}
