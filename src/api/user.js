import Http from "../utils/axios";

export default {
  login(param) {
    return Http.post("/v1/user/login", param);
  },
  register(param) {
    return Http.post("/v1/user/create", param);
  },
};
