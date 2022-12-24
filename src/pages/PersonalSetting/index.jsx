import "./index.css"
import {
  Link,
  Route,
  Switch,
  Redirect,
  useHistory
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function PersonalSetting() {
  const h = useHistory();
  return (
    <div style={{ height: "100%", display: "flex", userSelect: "none" }}>
      <div
        style={{
          width: 300,
          backgroundColor: "rgba(16, 16, 16, 0.1)",
        }}
      >
        <img className="head-portrait" src="/headPortrait.svg" />
        <div className="user-name">用户名</div>
        <Link to="/personal/login">
          <button style={{ marginTop: 10 }} className="primary-button">
            登录
          </button>
        </Link>
        <Link to="/personal/register">
          <button style={{ marginTop: 10 }} className="primary-button">
            注册
          </button>
        </Link>
      </div>
      <div
        style={{
          width: "100%",
        }}
        className={"login-register-box"}
      >
        <Switch>
          <Route exact path="/personal/login" component={Login}></Route>
          <Route exact path="/personal/register" component={Register}></Route>
          <Redirect to="/personal/login" />
        </Switch>
      </div>
    </div>
  );
}
