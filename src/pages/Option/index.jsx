import { useSelector, useDispatch } from 'react-redux'
import { openAppByIndex } from "../../store/option/action";

export default function Option() {
  const optionData = useSelector((state) => state.optionData);
  const dispatch = useDispatch();
  const onOptionClick = (index) => {
    dispatch(openAppByIndex(index));
  };
  return (
    <div>
      {optionData?.currentDataList?.map((item, index) => {
        let kv = optionData.content?.split(/:|：/);
        let vlaue = kv[1] ? kv[1] : kv[0];
        return (
          <div
            key={index}
            className="seek-option"
            onClick={() => onOptionClick(index)}
            style={{
              backgroundColor:
                index == optionData.optionIndex ? "rgb(78, 78, 78)" : "",
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
