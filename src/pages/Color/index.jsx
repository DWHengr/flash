import "./index.css";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useSelector } from "react-redux";
import FlashInput from "../../components/FlashInput";

export default function Color() {
  const settingData = useSelector((state) => state.settingData);

  const [hexValue, setHexValue] = useState("#ffffff");
  const [rgbValue, setRgbValue] = useState("rgb(255, 255, 255)");

  const handleHexChange = (value) => {
    const hex = value;
    setHexValue(hex);
    const rgb = convertHexToRgb(hex);
    setRgbValue(rgb);
  };

  const handleRgbChange = (value) => {
    const rgb = value;
    setRgbValue(rgb);
    const hex = convertRgbToHex(rgb);
    setHexValue(hex);
  };

  const convertHexToRgb = (hex) => {
    console.log(12);
    // 移除可能存在的 '#' 符号
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const convertRgbToHex = (rgb) => {
    try {
      const [r, g, b] = rgb
        .substring(rgb.indexOf("(") + 1, rgb.lastIndexOf(")"))
        .split(",")
        .map((value) => parseInt(value.trim(), 10));
      const hex = [r, g, b]
        .map((value) => {
          const hexValue = value.toString(16);
          return hexValue.length === 1 ? "0" + hexValue : hexValue;
        })
        .join("");
      return `#${hex}`;
    } catch (e) {}
  };

  return (
    <div
      className="cor-box"
      style={{ height: settingData.windowHeight - settingData.searchBoxHeight }}
    >
      <div className="cor-from-box">
        <div>
          <HexColorPicker
            style={{ height: 200, width: 200 }}
            color={hexValue}
            onChange={handleHexChange}
          />
        </div>
        <div className="cor-lump-group">
          <div className="cor-lump" style={{ background: hexValue }}></div>
        </div>
      </div>
      <div className="cor-to-box">
        <div>
          <div className="cor-label">HEX:</div>
          <div style={{ marginTop: -10 }}>
            <FlashInput
              value={hexValue}
              onChange={(e) => handleHexChange(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="cor-label">RGB:</div>
          <div style={{ marginTop: -10 }}>
            <FlashInput
              value={rgbValue}
              onChange={(e) => handleRgbChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
