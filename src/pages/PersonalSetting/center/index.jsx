import "./index.css";
import { useState, useEffect } from "react";
import FlahsInput from "../../../components/FlashInput";
import { useHistory } from "react-router-dom";
import user from "../../../api/user";
export default function Center() {
  const h = useHistory();
  const [userinfo, setUserinfo] = useState({});

  const toLink = (link) => {
    h.push(link);
  };

  useEffect(() => {
    user.info().then((res) => {
      if (res.code == 0) {
        setUserinfo(res.data);
      }
    });
  }, []);

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
          value={userinfo.email}
          readOnly
        >
          邮箱
        </FlahsInput>
        <FlahsInput
          width={260}
          type="text"
          name="email"
          value={userinfo.phone}
          readOnly
        >
          手机号
        </FlahsInput>
        <div>
          <div className="center-option">
            <label
              onClick={() => toLink("/personal/changepassword")}
              className="center-option-label"
            >
              修改密码
            </label>
          </div>
          <div className="center-option">
            <label className="center-option-label">设置邮箱</label>
          </div>
          <div className="center-option">
            <label className="center-option-bar-label">设置手机号</label>
          </div>
        </div>
      </div>
    </div>
  );
}
