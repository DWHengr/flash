import { useState } from "react";
import FlahsInput from "../../../components/FlashInput";
import user from "../../../api/user";
export default function Register() {
  const [userinfo, setUserinfo] = useState({
    username: "",
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

  const userinfoHandleChange = (event) => {
    const { name, value } = event.target;
    setUserinfo({ ...userinfo, [name]: value });
  };

  const onRegister = () => {
    if (!userinfo.username) {
      setMsg("用户名不能为空");
      return;
    }
    if (!userinfo.password) {
      setMsg("密码不能为空");
      return;
    }
    if (!userinfo.confirmPassword) {
      setMsg("确认密码不能为空");
      return;
    }
    if (userinfo.confirmPassword != userinfo.password) {
      setMsg("密码不一致");
      return;
    }
    setRegisterMsg("");
    user
      .register(userinfo)
      .then((res) => {
        if (res.code == 0) {
          setMsg("注册成功", true);
          setUserinfo({
            username: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          setMsg(res.msg);
        }
      })
      .catch((res) => {
        setMsg(res.message);
      });
  };

  return (
    <div className={"login-register-box"}>
      <label
        style={{ fontSize: 20, color: "rgb(155, 155, 155)", marginBottom: 10 }}
      >
        注册
      </label>
      <FlahsInput
        type="text"
        name="username"
        value={userinfo.username}
        onChange={userinfoHandleChange}
      >
        用户名
      </FlahsInput>
      <FlahsInput
        type="password"
        name="password"
        value={userinfo.password}
        onChange={userinfoHandleChange}
      >
        密码
      </FlahsInput>
      <FlahsInput
        type="password"
        name="confirmPassword"
        value={userinfo.confirmPassword}
        onChange={userinfoHandleChange}
      >
        确认密码
      </FlahsInput>
      <button
        style={{
          marginTop: 5,
        }}
        onClick={onRegister}
        className="minor-button"
      >
        注册 Flash
      </button>
      <div
        style={{
          color: registerMsg.isSuccess ? "#38E274" : "#FCDA01",
          marginTop: 5,
        }}
      >
        {registerMsg.msg}
      </div>
    </div>
  );
}
