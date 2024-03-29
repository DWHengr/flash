import "./index.css";
import { useState } from "react";
import FlashInput from "../../../components/FlashInput";
import user from "../../../api/user";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/user/action";
import { useHistory } from "react-router";
export default function Login() {
  const [userinfo, setUserinfo] = useState({ username: "", password: "" });
  const [loginMsg, setLoginMsg] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const h = useHistory();

  const userinfoHandleChange = (event) => {
    const { name, value } = event.target;
    setUserinfo({ ...userinfo, [name]: value });
  };
  const dispatch = useDispatch();
  const onLogin = () => {
    if (!userinfo.username) {
      setLoginMsg("用户名不能为空");
      return;
    }
    if (!userinfo.password) {
      setLoginMsg("密码不能为空");
      return;
    }
    setIsLogging(true);
    setLoginMsg("");
    user
      .login(userinfo)
      .then((res) => {
        if (res.code == 0) {
          h.push("/personal/option");
          dispatch(setUser(res.data.token, res.data.username, res.data.avatar));
        } else {
          setLoginMsg(res.msg);
        }
      })
      .catch((res) => {
        setLoginMsg(res.message);
      })
      .finally(() => {
        setIsLogging(false);
      });
  };
  return (
    <div className={"login-register-box"}>
      <label
        style={{ fontSize: 20, color: "rgb(155, 155, 155)", marginBottom: 10 }}
      >
        登录
      </label>
      <FlashInput
        name="username"
        value={userinfo.username}
        onChange={userinfoHandleChange}
        required
      >
        用户名
      </FlashInput>
      <FlashInput
        type="password"
        name="password"
        value={userinfo.password}
        onChange={userinfoHandleChange}
        required
      >
        密码
      </FlashInput>
      <div className="login-option">
        <label
          onClick={() => h.push("/personal/forgetpassword")}
          className="login-option-label"
        >
          忘记密码?
        </label>
      </div>
      <button
        style={{
          marginTop: 5,
        }}
        onClick={onLogin}
        className="minor-button"
        disabled={isLogging}
      >
        {isLogging ? "登录中..." : "登录 Flash"}
      </button>
      <div style={{ color: "#FCDA01", marginTop: 5 }}>{loginMsg}</div>
    </div>
  );
}
