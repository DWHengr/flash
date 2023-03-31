import "./index.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import FlashInput from "../../../components/FlashInput";
import MsgTipTxt from "../../../components/MsgTipTxt";
import user from "../../../api/user";
export default function ForgetPassword() {
  const h = useHistory();
  const [forgetInfo, setForgetInfo] = useState({
    username: "",
    code: "",
    password: "",
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

  const forgetInfoHandleChange = (event) => {
    const { name, value } = event.target;
    setForgetInfo({ ...forgetInfo, [name]: value });
  };

  const onSetForgetPwd = () => {
    setMsg("");
    if (!forgetInfo.username) {
      setMsg("用户名不能为空");
      return;
    }
    if (!forgetInfo.code) {
      setMsg("验证码不能为空");
      return;
    }
    user
      .forgetPwdSet(forgetInfo)
      .then((res) => {
        if (res.code == 0) {
          setMsg("修改成功", true);
          setForgetInfo({
            username: "",
            code: "",
            password: "",
          });
        } else {
          setMsg(res.msg);
        }
      })
      .catch((error) => {
        setMsg(error.message);
      });
  };

  const onSendVerifyCode = () => {
    setMsg("");
    if (timer > 0) return;
    if (!forgetInfo.username) {
      setMsg("用户名不能为空");
      return;
    }
    setTimer(60);
    user
      .sendForgetPwdVerifyCode({ username: forgetInfo.username })
      .then((res) => {
        if (res.code != 0) {
          setMsg(res.msg);
        }
      })
      .catch((error) => {
        setMsg(error.message);
      });
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
        <div>忘记密码</div>
      </div>

      <div className={"forget-pwd-box"}>
        <FlashInput
          width={260}
          type="text"
          name="username"
          value={forgetInfo.username}
          onChange={forgetInfoHandleChange}
        >
          用户名
        </FlashInput>
        <div style={{ width: "260px", display: "flex" }}>
          <FlashInput
            width={160}
            type="text"
            name="code"
            value={forgetInfo.code}
            onChange={forgetInfoHandleChange}
          >
            验证码
          </FlashInput>
          <div
            className={`forget-pwd-code-option ${
              timer <= 0 ? "forget-pwd-code-option-hover" : ""
            }`}
            onClick={onSendVerifyCode}
          >
            {timer > 0 ? `获取验证码(${timer}s)` : "获取验证码"}
          </div>
        </div>
        <FlashInput
          width={260}
          type="text"
          name="password"
          value={forgetInfo.password}
          onChange={forgetInfoHandleChange}
        >
          新密码
        </FlashInput>
        <div>
          <div style={{ position: "absolute" }}>
            <MsgTipTxt msg={msgInfo.msg} isSuccess={msgInfo.isSuccess} />
          </div>
          <div className="forget-pwd-option">
            <button
              onClick={onSetForgetPwd}
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
