import "./index.css";
import { useState } from "react";
export default function Login() {
  const [userinfo, setUserinfo] = useState({ username: "", password: "" });
  const [loginMsg, setLoginMsg] = useState("");

  const userinfoHandleChange = (event) => {
    const { name, value } = event.target;
    setUserinfo({ ...userinfo, [name]: value });
  };

  const onLogin = () => {
    if(!userinfo.username){
      setLoginMsg("用户名不能为空")
      return
    }
    if(!userinfo.password){
      setLoginMsg("密码不能为空")
      return
    }
  };
  return (
    <div>
      <label
        style={{ fontSize: 20, color: "rgb(155, 155, 155)", marginBottom: 10 }}
      >
        登录
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
          type="text"
          name="password"
          value={userinfo.password}
          onChange={userinfoHandleChange}
          required
        />
        <label>密码</label>
      </div>
      <button
        style={{
          marginTop: 5,
        }}
        onClick={onLogin}
        className="minor-button"
      >
        登录 Flash
      </button>
      <div style={{color:'red',marginTop:5}}>
        {loginMsg}
      </div>
    </div>
  );
}
