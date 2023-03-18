import "./index.css";
import { Link, Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Setting from "./Setting";
import Option from "./Option";
import Record from "./record";
import Center from "./center";
import ChangePassword from "./ChangePassword";
import { useLoading } from "../../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../store/user/action";

function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  if (!token) dispatch(clearUser());
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/personal/login" />
      }
    />
  );
}

export default function PersonalSetting() {
  const userDate = useSelector((state) => state.userData);
  const h = useHistory();
  const dispatch = useDispatch();
  let loading = useLoading();
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
        <Link to="/personal/center">
          <img
            className="head-portrait"
            src={userDate?.avatar ? userDate.avatar : "/headPortrait.svg"}
          />
        </Link>
        <div className="user-name">
          {userDate?.isLogin ? userDate.username : "用户名"}
        </div>
        {!userDate?.isLogin && (
          <div>
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
        )}
        <Link to="/personal/option">
          <button style={{ marginTop: 10 }} className="primary-button">
            选项设置
          </button>
        </Link>
        {userDate?.isLogin && (
          <div>
            <Link to="/personal/record">
              <button style={{ marginTop: 10 }} className="primary-button">
                同步记录
              </button>
            </Link>
            <button
              onClick={() => {
                dispatch(clearUser());
                h.push("/personal/login");
              }}
              style={{ marginTop: 10 }}
              className="primary-button"
            >
              注销
            </button>
          </div>
        )}
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
          <Route exact path="/personal/center" component={Center}></Route>
          <PrivateRoute
            exact
            path="/personal/record"
            component={Record}
          ></PrivateRoute>
          <Route
            exact
            path="/personal/changepassword"
            component={ChangePassword}
          ></Route>
          {userDate?.isLogin ? (
            <Redirect to="/personal/option" />
          ) : (
            <Redirect to="/personal/login" />
          )}
        </Switch>
      </div>
    </div>
  );
}
