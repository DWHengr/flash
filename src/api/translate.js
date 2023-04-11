import Http from "../utils/api";

export default {
  variableNames(param) {
    return Http.post("/v1/translate/var", param);
  },
};
