import axios from "axios";

const SERVICE_URL = "http://" + "127.0.0.1:3000";

axios.interceptors.request.use((config) => {
  config.headers["Token"] = localStorage.getItem("token");
  return config;
});

export default class Http {
  static send(config) {
    const configs = Object.assign(
      {
        timeout: 30000,
      },
      config
    );
    return axios(configs)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error) {
          switch (error.code) {
            case 500:
              break;
            case 404:
              break;
            default:
          }
        }
        throw error;
      });
  }

  static get(url, params = {}) {
    let urlParams = [];
    Object.keys(params).forEach((key) => {
      urlParams.push(`${key}=${encodeURIComponent(params[key])}`);
    });
    if (urlParams.length) {
      urlParams = `${SERVICE_URL + url}?${urlParams.join("&")}`;
    } else {
      urlParams = SERVICE_URL + url;
    }
    const config = {
      url: urlParams,
      params: {
        randomTime: new Date().getTime(),
      },
    };
    return Http.send(config);
  }

  static post(url, params = {}) {
    const config = {
      method: "post",
      url: SERVICE_URL + url,
      data: params,
    };
    return Http.send(config);
  }
}
