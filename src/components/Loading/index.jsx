import "./index.css";
import { useState, useCallback,createContext,useContext } from "react";

const LoadingBarContext = createContext();

export function useLoading() {
  const context = useContext(LoadingBarContext);
  return context;
}

export default function Loading(props) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingBarContext.Provider
      value={{ isLoading, showLoading, hideLoading }}
    >
      <div>
        {isLoading && (
          <div className="loading-box">
            <div className="loading-icon" data-tauri-drag-region>
              <svg className="loading-icon-content " viewBox="0 0 50 50">
                <circle className="ring" cx="25" cy="25" r="20"></circle>
                <circle className="ball" cx="25" cy="5" r="5"></circle>
              </svg>
              <div>正在加载中</div>
            </div>
          </div>
        )}
        <div>{props.children}</div>
      </div>
    </LoadingBarContext.Provider>
  );
}
