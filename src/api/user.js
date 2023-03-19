import Http from "../utils/axios";

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
};
