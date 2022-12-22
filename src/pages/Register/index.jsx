import { useState } from "react";
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
  };

  return (
    <div>
      <label
        style={{ fontSize: 20, color: "rgb(155, 155, 155)", marginBottom: 10 }}
      >
        注册
      </label>
      <div className="custom-input-box">
        <input
          type="text"
          name="username"
          value={userinfo.username}
          onChange={userinfoHandleChange}
          required
        />
        <label>用户名</label>
      </div>
      <div className="custom-input-box">
        <input
          type="password"
          name="password"
          value={userinfo.password}
          onChange={userinfoHandleChange}
          required
        />
        <label>密码</label>
      </div>
      <div className="custom-input-box">
        <input
          type="password"
          name="confirmPassword"
          value={userinfo.confirmPassword}
          onChange={userinfoHandleChange}
          required
        />
        <label>确认密码</label>
      </div>
      <button
        style={{
          marginTop: 5,
        }}
        onClick={onRegister}
        className="minor-button"
      >
        注册 Flash
      </button>
      <div style={{ color: "red", marginTop: 5 }}>{registerMsg}</div>
    </div>
  );
}
