import "./index.css";
import { useState } from "react";
import FlahsInput from "../../../components/FlashInput";
export default function ChangePassword() {

  const [pwdinfo, setPwdinfo] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const pwdinfoHandleChange = (event) => {
    const { name, value } = event.target;
    setPwdinfo({ ...userinfo, [name]: value });
  };

  return (
    <div>
      <div className="option-bar">
        <div>修改密码</div>
      </div>
      <div className={"change-pwd-box"}>
      <FlahsInput
          width={260}
          type="text"
          name="oldPassword"
          vlaue={pwdinfo.oldPassword}
          onChange={pwdinfoHandleChange}
        >
          原密码
        </FlahsInput>
        <FlahsInput
          width={260}
          type="text"
          name="newPassword"
          vlaue={pwdinfo.newPassword}
          onChange={pwdinfoHandleChange}
        >
          新密码
        </FlahsInput>
        <FlahsInput
          width={260}
          type="text"
          name="confirmPassword"
          vlaue={pwdinfo.newPassword}
          onChange={pwdinfoHandleChange}
        >
          确认密码
        </FlahsInput>
        <div>
        <div className="change-pwd-option">
        <button style={{width:"100px"}} className="minor-button">
                确认修改
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
