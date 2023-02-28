import Http from "../utils/axios";

export default {
  create(param) {
    return Http.post("/v1/collocate/create", param);
  },
  list() {
    return Http.get("/v1/collocate/list");
  }
};
