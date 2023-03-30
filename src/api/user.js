import Http from "../utils/api";

export default {
  login(param) {
    return Http.post("/v1/user/login", param);
  },
  register(param) {
    return Http.post("/v1/user/register", param);
  },
  info() {
    return Http.get("/v1/user/info");
  },
  changePwd(param) {
    return Http.post("/v1/user/pwd", param);
  },
  changeAvatar(param) {
    return Http.post("/v1/user/avatar", param);
  },
  sendEmailSettingVerifyCode(param) {
    return Http.post("/v1/user/code/email-setting", param);
  },
  setEmail(param) {
    return Http.post("/v1/user/set-email", param);
  },
  sendForgetPwdVerifyCode(param) {
    return Http.post("/v1/user/code/forget-pwd", param);
  },
};
