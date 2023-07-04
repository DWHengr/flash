import "./index.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";

export default function QRcode() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  let [textData, setTextData] = useState("");
  let [qrData, setQrData] = useState("");

  useEffect(() => {
    if (!searchData.trigger.enter) return;
    if (!searchData.content) return;
    setQrData(searchData.searchValue);
    setTextData(searchData.searchValue);
  }, [searchData.trigger]);

  return (
    <div
      className="qr-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <textarea
        className="qr-from-box"
        value={textData}
        onChange={(e) => {
          setTextData(e.target.value);
        }}
      ></textarea>
      <div className="qr-operate-box">
        <div className="qr-button" onClick={() => setQrData(textData)}>
          生成
        </div>
      </div>
      <div className="qr-to-box">
        <div>
          <QRCode
            value={qrData}
            imageSettings={{ src: "icon.png", height: 30, width: 30 }}
            size={200}
          />
        </div>
      </div>
    </div>
  );
}
