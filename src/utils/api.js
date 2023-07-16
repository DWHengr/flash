import { getClient, ResponseType } from "@tauri-apps/api/http";

const SERVICE_URL = "http://" + "127.0.0.1:3000";

function send(configs) {
  return new Promise(async (resolve, reject) => {
    const client = await getClient();
    client
      .request({
        url: configs.url,
        body: {
          type: "Json",
          payload: configs.data ? configs.data : {},
        },
        method: configs.method,
        timeout: 10,
        headers: {
          ...configs.headers,
          token: localStorage.getItem("token")
            ? localStorage.getItem("token")
            : "",
        },
        responseType: ResponseType.JSON,
      })
      .then((response) => {
        if (response.ok) {
          return resolve({
            ...response.data,
          });
        } else {
          reject({
            message: "Request failed with status code " + response.status,
          });
        }
      })
      .catch((e) => reject({ message: `网络错误: ${e}` }));
  });
}

function send_api(configs) {
  return new Promise(async (resolve, reject) => {
    const client = await getClient();
    client
      .request({
        url: configs.url,
        method: configs.method,
        timeout: 10,
        body: {
          type: "Json",
          payload: configs.data ? configs.data : {},
        },
        headers: {
          ...configs.headers,
        },
        responseType: ResponseType.Text,
      })
      .then((response) => {
        if (response.ok) {
          return resolve(response.data);
        } else {
          reject({
            message: "Request failed with status code " + response.status,
          });
        }
      })
      .catch((e) => reject({ message: `网络错误: ${e}` }));
  });
}

function get(url, params = {}) {
  let urlParams = [];
  Object.keys(params).forEach((key) => {
    urlParams.push(`${key}=${encodeURIComponent(params[key])}`);
  });
  if (urlParams.length) {
    urlParams = `${SERVICE_URL + url}?${urlParams.join("&")}`;
  } else {
    urlParams = SERVICE_URL + url;
  }
  const configs = {
    url: urlParams,
    method: "GET",
    params: {
      randomTime: new Date().getTime(),
    },
  };
  return send(configs);
}

function post(url, params = {}) {
  const configs = {
    method: "POST",
    url: SERVICE_URL + url,
    data: params,
  };
  return send(configs);
}

function get_api(api, url, params = {}) {
  let urlParams = [];
  Object.keys(params).forEach((key) => {
    urlParams.push(`${key}=${encodeURIComponent(params[key])}`);
  });
  if (urlParams.length) {
    urlParams = `${api + url}?${urlParams.join("&")}`;
  } else {
    urlParams = api + url;
  }
  console.log(urlParams);
  const configs = {
    url: urlParams,
    method: "GET",
    params: {
      randomTime: new Date().getTime(),
    },
  };
  return send_api(configs);
}

export default { post, get, get_api };
