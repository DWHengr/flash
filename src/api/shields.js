import Http from "../utils/api";

export default {
  create(param) {
    return Http.get_api("https://img.shields.io", "/badge/" + param);
  },
};
