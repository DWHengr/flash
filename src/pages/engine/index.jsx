import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { setCurrentListLenghtStore } from "../../store/search/action";
import { openUrl } from "../../utils/command";

export default function Engine() {
  const searchData = useSelector((state) => state.searchData);
  const settingData = useSelector((state) => state.settingData);
  const allEngine = [
    { name: "baidu", icon: "/baidu.ico" },
    { name: "biying", icon: "/biying.ico" },
    { name: "csdn", icon: "/csdn.ico" },
  ];
  const [currentEngine, setCurrentEngine] = useState([]);
  const dispatch = useDispatch();
  const onOptionClick = (index) => {
    openSearchEngine(currentEngine[index].name, searchData.searchValue);
  };
  useEffect(() => {
    if (!searchData.content) return;
    let newCurrentEngine = [];
    if (searchData.kv.length == 1) {
      newCurrentEngine = allEngine.filter(
        (item) => item.name?.indexOf(settingData.search_engine) != -1
      );
    } else if (
      searchData.searchKey == "eng" ||
      searchData.searchKey == "engine"
    ) {
      newCurrentEngine = allEngine;
    } else {
      newCurrentEngine = allEngine.filter(
        (item) => item.name?.indexOf(searchData.searchKey) != -1
      );
    }
    setCurrentEngine(newCurrentEngine);
    dispatch(setCurrentListLenghtStore(newCurrentEngine.length));
  }, [searchData.content]);

  useEffect(() => {
    if (!searchData.trigger) return;
    openSearchEngine(
      currentEngine[searchData.currentIndex].name,
      searchData.searchValue
    );
  }, [searchData.trigger]);

  const openSearchEngine = (engine, value) => {
    switch (engine) {
      case "biying":
        openUrl("https://cn.bing.com/search?q=" + value);
        break;
      case "csdn":
        openUrl("https://so.csdn.net/so/search?q=" + value);
        break;
      case "baidu":
      default:
        openUrl("https://www.baidu.com/s?wd=" + value);
        break;
    }
  };
  return (
    <div>
      {currentEngine?.map((item, index) => {
        return (
          <div
            key={index}
            className="seek-option"
            onClick={() => onOptionClick(index)}
            style={{
              backgroundColor:
                index == searchData.currentIndex ? "rgb(78, 78, 78)" : "",
            }}
          >
            <img src={item.icon} className="seek-option-icon" />

            <div style={{ display: "inline-block" }}>
              <div className="seek-option-name">{item.name} 搜索</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
