import "./index.css";
import { useState } from "react";
import { useHistory } from "react-router";
import FlashInput from "../../../components/FlashInput";
import MsgTipTxt from "../../../components/MsgTipTxt";
import user from "../../../api/user";
export default function ChangePassword() {
  const h = useHistory();
  const [pwdinfo, setPwdinfo] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [msgInfo, setMsgInfo] = useState({
    isSuccess: false,
    msg: "",
  });

  const setMsg = (msg, isSuccess = false) => {
    setMsgInfo({
      isSuccess: isSuccess,
      msg: msg,
    });
  };

  const pwdinfoHandleChange = (event) => {
    const { name, value } = event.target;
    setPwdinfo({ ...pwdinfo, [name]: value });
  };

  const onChangePwd = () => {
    setMsg("");
    if (!pwdinfo.oldPassword) {
      setMsg("原密码不能为空");
      return;
    }
    if (!pwdinfo.newPassword) {
      setMsg("新密码不能为空");
      return;
    }
    if (!pwdinfo.confirmPassword) {
      setMsg("确认密码不能为空");
      return;
    }
    if (pwdinfo.oldPassword == pwdinfo.newPassword) {
      setMsg("原密码与新密码一致");
      return;
    }
    if (pwdinfo.confirmPassword != pwdinfo.newPassword) {
      setMsg("密码不一致");
      return;
    }
    user
      .changePwd(pwdinfo)
      .then((res) => {
        if (res.code == 0) {
          setPwdinfo({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setMsg("修改成功", true);
        } else {
          setMsg(res.msg);
        }
      })
      .catch((res) => {
        setMsg(res.message);
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
        <div>修改密码</div>
      </div>
      <div className={"change-pwd-box"}>
        <FlashInput
          width={260}
          type="text"
          name="oldPassword"
          value={pwdinfo.oldPassword}
          onChange={pwdinfoHandleChange}
        >
          原密码
        </FlashInput>
        <FlashInput
          width={260}
          type="text"
          name="newPassword"
          value={pwdinfo.newPassword}
          onChange={pwdinfoHandleChange}
        >
          新密码
        </FlashInput>
        <FlashInput
          width={260}
          type="text"
          name="confirmPassword"
          value={pwdinfo.confirmPassword}
          onChange={pwdinfoHandleChange}
        >
          确认密码
        </FlashInput>
        <div>
          <div style={{ position: "absolute" }}>
            <MsgTipTxt msg={msgInfo.msg} isSuccess={msgInfo.isSuccess} />
          </div>
          <div className="change-pwd-option">
            <button
              onClick={onChangePwd}
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
