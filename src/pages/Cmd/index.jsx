import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  setContentStore,
  setCurrentListLenghtStore,
} from "../../store/search/action";
import { optionPageRoutes } from "../pageRoutes";

export default function Cmd() {
  const optionData = optionPageRoutes;
  const searchData = useSelector((state) => state.searchData);
  const [currentDataList, setCurrentDataList] = useState([]);
  const dispatch = useDispatch();
  const onOptionClick = (index) => {
    openCmd(currentDataList[index]);
  };

  const openCmd = (item) => {
    dispatch(setContentStore(`${item.name}:`));
  };

  useEffect(() => {
    if (!searchData.content) return;
    let kv = searchData.kv;
    let currentOption = [];

    optionData.map((item) => {
      item.cmds?.map((cmd) => {
        if (
          (cmd && kv?.length == 2 && !kv[1]) ||
          cmd?.indexOf(kv[1] ? kv[1] : kv[0]) != -1
        ) {
          currentOption.push({
            name: cmd,
            icon: item.icon,
            describe: item.describe,
            path: item.path,
          });
        }
      });
    });
    dispatch(setCurrentListLenghtStore(currentOption.length));
    setCurrentDataList(currentOption);
  }, [searchData.content]);

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    openCmd(currentDataList[searchData.currentIndex]);
  }, [searchData.trigger]);

  return (
    <div>
      {currentDataList?.map((item, index) => {
        let kv = searchData.content?.split(/:|：/);
        let vlaue = kv[1] ? kv[1] : kv[0];
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
                    vlaue,
                    `<span class="seek-option-keyword">${vlaue}</span>`
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
