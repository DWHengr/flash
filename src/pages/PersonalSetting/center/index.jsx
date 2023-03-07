import "./index.css";
import { useState } from "react";
import FlahsInput from "../../../components/FlashInput";
import user from "../../../api/user";
export default function Center() {
  const [userinfo, setUserinfo] = useState({
    username: "2",
    password: "",
    confirmPassword: "",
  });
  const [registerMsg, setRegisterMsg] = useState({
    isSuccess: false,
    msg: "",
  });

  const setMsg = (msg, isSuccess = false) => {
    setRegisterMsg({
      isSuccess: isSuccess,
      msg: msg,
    });
  };

  return (
    <div>
      <div className="option-bar">
        <div>个人中心</div>
      </div>
      <div className={"center-box"}>
        <FlahsInput
          width={260}
          type="text"
          name="username"
          value={userinfo.username}
          readOnly
        >
          用户名
        </FlahsInput>
        <FlahsInput
          width={260}
          type="text"
          name="phone"
          value={userinfo.password}
          readOnly
        >
          邮箱
        </FlahsInput>
        <FlahsInput
          width={260}
          type="text"
          name="email"
          value={userinfo.confirmPassword}
          readOnly
        >
          手机号
        </FlahsInput>
      </div>
    </div>
  );
}
