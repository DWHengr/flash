import "./index.css";
import { useState, useCallback, createContext, useContext } from "react";

const LoadingBarContext = createContext();

export function useLoading() {
  const context = useContext(LoadingBarContext);
  return context;
}

export default function Loading(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowSuccessMsg, setIsShowSuccessMsg] = useState(false);
  const [tip, setTip] = useState("");

  const showLoading = useCallback((tip = "正在加载中") => {
    setTip(tip);
    setIsShowSuccessMsg(false);
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsShowSuccessMsg(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  return (
    <LoadingBarContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      <div>
        {isLoading && (
          <div className="loading-box">
            <div className="loading-icon" data-tauri-drag-region>
              <div className="loading-icon-box">
                {!isShowSuccessMsg && (
                  <svg className="loading-icon-content" viewBox="0 0 50 50">
                    <circle className="ring" cx="25" cy="25" r="20"></circle>
                    <circle className="ball" cx="25" cy="5" r="5"></circle>
                  </svg>
                )}
                {isShowSuccessMsg && (
                  <img className="loading-icon-box" src="/finish.svg" />
                )}
              </div>
              {!isShowSuccessMsg && <div>{tip}</div>}
              {isShowSuccessMsg && (
                <div style={{ color: "#38E274" }}>加载完成</div>
              )}
            </div>
          </div>
        )}
        <div>{props.children}</div>
      </div>
    </LoadingBarContext.Provider>
  );
}
