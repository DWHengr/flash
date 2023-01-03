import "./index.css";
import { Link, Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Setting from "./Setting";
import Option from "./Option";

export default function PersonalSetting() {
  const h = useHistory();
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        userSelect: "none",
        color: "rgb(155, 155, 155)",
      }}
    >
      <div
        style={{
          width: 150,
          backgroundColor: "rgba(16, 16, 16, 0.1)",
          position: "relative",
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
        <Link to="/personal/option">
          <button style={{ marginTop: 10 }} className="primary-button">
            选项设置
          </button>
        </Link>
        <div
          className="setting"
          onClick={() => {
            h.push("/personal/setting");
          }}
        >
          设置
        </div>
      </div>
      <div style={{ width: 450 }}>
        <Switch>
          <Route exact path="/personal/login" component={Login}></Route>
          <Route exact path="/personal/register" component={Register}></Route>
          <Route exact path="/personal/setting" component={Setting}></Route>
          <Route exact path="/personal/option" component={Option}></Route>
          <Redirect to="/personal/login" />
        </Switch>
      </div>
    </div>
  );
}
