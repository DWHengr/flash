import "./index.css";
import "./iconfont.css";
export default function Option() {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ height: 200, background: "rgba(27, 27, 27, 0.9)" }}>ww</div>
      <div className="option-add-bar">
        <div className="option-add-bar-button">
          <i
            style={{ fontSize: 30 }}
            className="option-add-bar-button-icon iconfont icon-zhankai"
          />
        </div>
      </div>
    </div>
  );
}
