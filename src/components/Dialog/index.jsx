import "./index.css";
import { useState, useEffect } from "react";

function Dialog({ visible, onVisible, tip, onOk }) {
  const [showModal, setShowModal] = useState(visible);

  const showModalHandler = () => {
    setShowModal(true);
    onVisible(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
    onVisible(false);
  };

  useEffect(() => {
    setShowModal(visible);
  }, [visible]);

  function handleOnOk() {
    if (typeof onOk === "function") {
      onOk();
      setShowModal(false);
      onVisible(false);
    }
  }

  return (
    <div className="modal-box">
      {showModal ? (
        <div className="modal">
          <div className="modal-content">
            <h2>{tip}</h2>
            <button
              style={{ width: "60px", margin: "5px" }}
              className="primary-button"
              onClick={handleOnOk}
            >
              确定
            </button>
            <button
              onClick={hideModalHandler}
              style={{ width: "60px", margin: "5px" }}
              className="minor-button"
            >
              取消
            </button>
          </div>
          <div className="modal-overlay" onClick={hideModalHandler}></div>
        </div>
      ) : null}
    </div>
  );
}

export default Dialog;
