import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentListLenghtStore } from "../../store/search/action";
import { openUrl } from "../../utils/command";

export default function Www() {
  const searchData = useSelector((state) => state.searchData);

  const allOpt = [{ name: "www", icon: "/www.png" }];

  const dispatch = useDispatch();
  const onOptionClick = (index) => {
    openWwwUrl(allOpt[index].name, searchData.searchValue);
  };

  useEffect(() => {
    if (!searchData.content) return;
    dispatch(setCurrentListLenghtStore(allOpt.length));
  }, [searchData.content]);

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    openWwwUrl(searchData.searchValue);
  }, [searchData.trigger]);

  const openWwwUrl = (value) => {
    openUrl(value);
  };

  return (
    <div>
      {allOpt?.map((item, index) => {
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
              <div className="seek-option-name">{item.name}打开网址</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
