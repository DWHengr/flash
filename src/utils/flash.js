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
