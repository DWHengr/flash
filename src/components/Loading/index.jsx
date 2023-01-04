import "./index.css";
export default function Loading(props) {
  return (
    <div>
      <div className="loading-box">
        <div className="loading-icon" data-tauri-drag-region>
          <svg className=".loading-icon-content " viewBox="0 0 50 50">
            <circle class="ring" cx="25" cy="25" r="20"></circle>
            <circle class="ball" cx="25" cy="5" r="5"></circle>
          </svg>
          <div>正在加载中</div>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
}
