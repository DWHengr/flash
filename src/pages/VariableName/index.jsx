import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentListLenghtStore } from "../../store/search/action";
import translate from "../../api/translate";

export default function VariableName() {
  const searchData = useSelector((state) => state.searchData);
  const [currentDataList, setCurrentDataList] = useState([]);
  const dispatch = useDispatch();
  const onOptionClick = (index) => {};

  useEffect(() => {
    dispatch(setCurrentListLenghtStore(currentDataList.length));
  }, [searchData.content]);

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    translate
      .variableNames({ variableName: searchData.searchValue })
      .then((res) => {
        if (res.code == 0) {
          let currentOption = res.data;
          dispatch(setCurrentListLenghtStore(currentOption.length));
          setCurrentDataList(currentOption);
        }
      });
  }, [searchData.trigger]);

  return (
    <div>
      {currentDataList?.length <= 0 && (
        <div className="variable-bar">暂时无数据 Enter获取变量命名</div>
      )}
      {currentDataList?.map((item, index) => {
        return (
          <div
            key={item.name}
            className="seek-option"
            onClick={() => onOptionClick(index)}
            style={{
              backgroundColor:
                index == searchData.currentIndex ? "rgb(78, 78, 78)" : "",
            }}
          >
            <img src={`/${item.name}.svg`} className="seek-option-icon" />

            <div style={{ display: "inline-block" }}>
              <div className="seek-option-name">{item.value}</div>
              <div className="seek-option-describe">{item.describe}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
