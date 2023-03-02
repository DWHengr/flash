import { useState } from "react";
import FlahsInput from "../../../components/FlashInput";
import user from "../../../api/user";
export default function Register() {
  const [userinfo, setUserinfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [registerMsg, setRegisterMsg] = useState("");

  const userinfoHandleChange = (event) => {
    const { name, value } = event.target;
    setUserinfo({ ...userinfo, [name]: value });
  };

  const onRegister = () => {
    if (!userinfo.username) {
      setRegisterMsg("用户名不能为空");
      return;
    }
    if (!userinfo.password) {
      setRegisterMsg("密码不能为空");
      return;
    }
    if (!userinfo.confirmPassword) {
      setRegisterMsg("确认密码不能为空");
      return;
    }
    if (userinfo.confirmPassword != userinfo.password) {
      setRegisterMsg("密码不一致");
      return;
    }
    setRegisterMsg("");
    user
      .register(userinfo)
      .then((res) => {
        if (res.code == 0) {
          console.log(res);
        } else {
          setRegisterMsg(res.msg);
        }
      })
      .catch((res) => {
        setRegisterMsg(res.message);
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
      <div style={{ color: "#FCDA01", marginTop: 5 }}>{registerMsg}</div>
    </div>
  );
}
