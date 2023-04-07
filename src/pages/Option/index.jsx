import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentListLenghtStore } from "../../store/search/action";
import { openApp } from "../../utils/command";

export default function Option() {
  const optionData = useSelector((state) => state.optionData);
  const searchData = useSelector((state) => state.searchData);
  const [currentDataList, setCurrentDataList] = useState([]);
  const dispatch = useDispatch();
  const onOptionClick = (index) => {
    openApp(currentDataList[index]);
  };
  useEffect(() => {
    if (!searchData.content) return;
    let kv = searchData.kv;
    let currentOption = [];
    if (kv[0] == "opt") {
      currentOption = optionData.allDataList;
    } else {
      currentOption = optionData.allDataList.filter(
        (item) => item.option_type?.indexOf(kv[0]) != -1
      );
    }
    currentOption = currentOption.filter(
      (item) =>
        (kv?.length == 2 && !kv[1]) ||
        item.name?.indexOf(kv[1] ? kv[1] : kv[0]) != -1
    );
    dispatch(setCurrentListLenghtStore(currentOption.length));
    setCurrentDataList(currentOption);
  }, [searchData.content]);

  useEffect(() => {
    console.log(searchData.trigger);
    if (!searchData.trigger) return;
    openApp(currentDataList[searchData.currentIndex]);
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
