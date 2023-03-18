import "./index.css";
import { useState, useEffect } from "react";
import FlashInput from "../../../components/FlashInput";
import { useHistory } from "react-router-dom";
import user from "../../../api/user";
import Resizer from "react-image-file-resizer";
import Dropzone from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import { setUserAvatar } from "../../../store/user/action";
export default function Center() {
  const h = useHistory();
  const userDate = useSelector((state) => state.userData);
  const [avatar, setAvatar] = useState(userDate.avatar);
  const [userinfo, setUserinfo] = useState({});
  const dispatch = useDispatch();

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

  const handleAvatarChange = (file) => {
    Resizer.imageFileResizer(
      file,
      70,
      70,
      "PNG",
      80,
      0,
      (uri) => {
        setAvatar(uri);
        dispatch(setUserAvatar(uri));
      },
      "base64"
    );
  };

  return (
    <div>
      <div className="option-bar">
        <div>个人中心</div>
      </div>
      <div className={"center-box"}>
        <FlashInput
          width={260}
          type="text"
          name="username"
          value={userinfo.username}
          readOnly
        >
          用户名
        </FlashInput>
        <FlashInput
          width={260}
          type="text"
          name="phone"
          value={userinfo.email}
          readOnly
        >
          邮箱
        </FlashInput>
        <FlashInput
          width={260}
          type="text"
          name="email"
          value={userinfo.phone}
          readOnly
        >
          手机号
        </FlashInput>
        <div>
          <div style={{ position: "absolute" }}>
            <Dropzone
              onDrop={(acceptedFiles) => handleAvatarChange(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <diV className="center-avatar">
                    <img
                      style={{ width: "70px", height: "70px" }}
                      src={avatar ? avatar : "/headPortrait.svg"}
                    />
                    <div
                      style={{
                        width: "100%",
                        fontSize: 6,
                        position: "absolute",
                        bottom: 3,
                        color: "#fff",
                        backgroundColor: "rgba(128,128,128,0.7)",
                      }}
                    >
                      修改头像
                    </div>
                  </diV>
                </div>
              )}
            </Dropzone>
          </div>
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
