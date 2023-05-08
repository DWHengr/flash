import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  setContentStore,
  setCurrentListLenghtStore,
} from "../../store/search/action";
import { openUrl } from "../../utils/command";
import { optionPageRoutes } from "../pageRoutes";

export default function Default() {
  const searchData = useSelector((state) => state.searchData);
  const settingData = useSelector((state) => state.settingData);
  const [currentDataList, setCurrentDataList] = useState([]);
  const allEngine = [
    { name: "baidu", icon: "/baidu.ico" },
    { name: "biying", icon: "/biying.ico" },
    { name: "csdn", icon: "/csdn.ico" },
  ];
  const optionRoutes = optionPageRoutes;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!searchData.content) return;
    let currentData = [];
    allEngine.map((item) => {
      if (item.name?.indexOf(settingData.search_engine) != -1) {
        currentData.push({
          name: `${item.name} 搜索`,
          icon: item.icon,
          describe: "默认搜索引擎",
        });
      }
    });

    optionRoutes.map((item) => {
      item.cmds?.map((cmd) => {
        if (cmd.indexOf(searchData.content) != -1) {
          currentData.push({
            name: cmd,
            icon: item.icon,
            describe: item.describe,
            path: item.path,
          });
        }
      });
    });
    setCurrentDataList(currentData);
    dispatch(setCurrentListLenghtStore(currentData.length));
  }, [searchData.content]);

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    openOption(currentDataList[searchData.currentIndex], searchData.content);
  }, [searchData.trigger]);

  useEffect(() => {
    if (!searchData.trigger.tab) return;
    if (currentDataList?.length > 1)
      dispatch(setContentStore(`${currentDataList[1].name}:`));
  }, [searchData.trigger]);

  const onOptionClick = (index) => {
    openOption(currentDataList[index], searchData.content);
  };

  const openOption = (option, content) => {
    if (option.path) {
      dispatch(setContentStore(`${option.name}:`));
    } else {
      openSearchEngine(option.name, content);
    }
  };

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
      {currentDataList?.map((item, index) => {
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
              <div
                className="seek-option-name"
                dangerouslySetInnerHTML={{
                  __html: item.name?.replace(
                    searchData.content,
                    `<span class="seek-option-keyword">${searchData.content}</span>`
                  ),
                }}
              ></div>
              <div className="seek-option-describe">{item.describe}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
