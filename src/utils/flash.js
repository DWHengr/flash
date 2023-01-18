export function setOptionIcon(o) {
  o.icon = "/icon.svg";

  if (o.option_type == "project") o.icon = "/project.svg";
  if (o.option_type == "file") o.icon = "/file.svg";
  if (o.option_type == "app") o.icon = "/app.svg";
  if (o.option_type == "folder") o.icon = "/folder.svg";
  if (o.option_type == "link") {
    o.icon = "/link.svg";
    try {
      let pattern = new RegExp("^https?://[^/]*", "i");
      let domain = pattern.exec(o.path);
      if (domain)
        client
          .get(domain[0] + "/favicon.ico", {
            timeout: 5,
            responseType: ResponseType.Binary,
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
    } catch {}
  }
}
