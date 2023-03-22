import "./index.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import FlashInput from "../../../components/FlashInput";
import MsgTipTxt from "../../../components/MsgTipTxt";
import user from "../../../api/user";
import { validateEmail } from "../../../utils/flash";
export default function SetEmail() {
  const h = useHistory();
  const [emailInfo, setEmailInfo] = useState({
    email: "",
    code: "",
  });
  const [timer, setTimer] = useState(0);

  const [msgInfo, setMsgInfo] = useState({
    isSuccess: false,
    msg: "",
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(
        () => setTimer((prevTimer) => prevTimer - 1),
        1000
      );
      return () => clearInterval(interval);
    }
  }, [timer]);

  const setMsg = (msg, isSuccess = false) => {
    setMsgInfo({
      isSuccess: isSuccess,
      msg: msg,
    });
  };

  const emailInfoHandleChange = (event) => {
    const { name, value } = event.target;
    setEmailInfo({ ...emailInfo, [name]: value });
  };

  const onSetEmail = () => {
    setMsg("");
    if (!emailInfo.email) {
      setMsg("邮箱不能为空");
      return;
    }
    if (!validateEmail(emailInfo.email)) {
      setMsg("邮箱格式错误");
      return;
    }
    if (!emailInfo.code) {
      setMsg("验证码不能为空");
      return;
    }
  };

  const onSendVerifyCode = () => {
    setMsg("");
    if (timer > 0) return;
    if (!emailInfo.email) {
      setMsg("邮箱不能为空");
      return;
    }
    if (!validateEmail(emailInfo.email)) {
      setMsg("邮箱格式错误");
      return;
    }
    setTimer(60);
  };

  return (
    <div>
      <div className="option-bar">
        <div
          style={{
            position: "absolute",
            left: "3px",
            display: "inline-block",
          }}
        >
          <i
            style={{ fontSize: 28, marginRight: 5 }}
            onClick={h.goBack}
            className="option-add-bar-button-icon iconfont icon-fanhui"
          />
        </div>
        <div>设置邮箱</div>
      </div>
      <div className={"set-email-box"}>
        <FlashInput
          width={260}
          type="text"
          name="email"
          value={emailInfo.email}
          onChange={emailInfoHandleChange}
        >
          邮箱
        </FlashInput>
        <div style={{ width: "260px", display: "flex" }}>
          <FlashInput
            width={160}
            type="text"
            name="code"
            value={emailInfo.code}
            onChange={emailInfoHandleChange}
          >
            验证码
          </FlashInput>
          <div
            className={`set-email-code-option ${
              timer <= 0 ? "set-email-code-option-hover" : ""
            }`}
            onClick={onSendVerifyCode}
          >
            {timer > 0 ? `获取验证码(${timer}s)` : "获取验证码"}
          </div>
        </div>
        <div>
          <div style={{ position: "absolute" }}>
            <MsgTipTxt msg={msgInfo.msg} isSuccess={msgInfo.isSuccess} />
          </div>
          <div className="set-email-option">
            <button
              onClick={onSetEmail}
              style={{ width: "100px" }}
              className="minor-button"
            >
              确认修改
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
