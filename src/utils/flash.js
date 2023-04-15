import { getClient } from "@tauri-apps/api/http";
export async function setOptionIcon(o) {
  o.icon = "/icon.svg";
  const client = await getClient();
  if (o.option_type == "project") o.icon = "/project.svg";
  if (o.option_type == "file") o.icon = "/file.svg";
  if (o.option_type == "app") o.icon = "/app.svg";
  if (o.option_type == "folder") o.icon = "/folder.svg";
  if (o.option_type == "link") {
    o.icon = "/link.svg";
    try {
      let pattern = new RegExp("^https?://[^/]*", "i");
      let domain = pattern.exec(o.path);
      let url = "";
      if (!domain) {
        let pattern = new RegExp("([^/]*)", "i");
        let domain = pattern.exec(o.path);
        if (domain) url = "http://" + domain[0];
      } else {
        url = domain[0];
      }
      if (url)
        client
          .get(url + "/favicon.ico", {
            timeout: 60,
            responseType: 3,
          })
          .then((res) => {
            if (res?.status == 200) {
              o.icon =
                "data:image/png;base64," +
                btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );
            }
          });
    } catch (res) {
      console.log(res);
    }
  }
}

export function formatDate(date) {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function validateEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

export function validateSpecialCharacters(str) {
  const pattern = /[^A-Za-z0-9]/;
  return pattern.test(str);
}

export function isChinese(str) {
  const pattern = /[\u4e00-\u9fa5]/;
  return pattern.test(str);
}