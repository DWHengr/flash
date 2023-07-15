import "./index.css";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { save } from "@tauri-apps/api/dialog";
import { writeBinaryFile } from "@tauri-apps/api/fs";
import QRCode from "qrcode.react";

export default function QRcode() {
  const settingData = useSelector((state) => state.settingData);
  const searchData = useSelector((state) => state.searchData);

  let [textData, setTextData] = useState("");
  let [qrData, setQrData] = useState("");
  const qrCodeRef = useRef(null);

  let onDownloadQr = async () => {
    const filePath = await save({
      defaultPath: "qrcode",
      filters: [
        {
          name: "Image",
          extensions: ["png", "jpeg"],
        },
      ],
    });
    const qrCodeDataURL = qrCodeRef.current.querySelector("canvas").toDataURL();
    const response = await fetch(qrCodeDataURL);
    const blob = await response.blob();
    const data = await blob.arrayBuffer();
    await writeBinaryFile(filePath, data);
  };

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
        <div ref={qrCodeRef}>
          <QRCode
            value={qrData}
            imageSettings={{ src: "icon.png", height: 30, width: 30 }}
            size={200}
          />
        </div>
        <div className="qr-button" onClick={onDownloadQr}>
          下载
        </div>
      </div>
    </div>
  );
}
