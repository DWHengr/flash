import Http from "../utils/api";

export default {
  translate(param) {
    return Http.post("/v1/translate/xfyun", param);
  },
  variableNames(param) {
    return Http.post("/v1/translate/var", param);
  },
};
