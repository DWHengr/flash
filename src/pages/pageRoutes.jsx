import Option from "./Option";
import Engine from "./engine";
import Default from "./Default";
import VariableName from "./VariableName";
import Translate from "./Translate";
import Json from "./Json";
import Crypt from "./Crypt";
import Base64 from "./Base64";
import Md5 from "./Md5";
import Aes from "./Aes";

export const optionPageRoutes = [
  { path: "/default", component: <Default /> },
  { path: "/personal/setting", cmds: ["set"] },
  { path: "/personal", cmds: ["pre"] },
  { path: "/option", component: <Option />, cmds: ["", "opt", "link"] },
  {
    path: "/engine",
    component: <Engine />,
    cmds: ["eng", "baidu", "biying", "csdn"],
  },
  { path: "/variablename", component: <VariableName />, cmds: ["var"] },
  { path: "/translate", component: <Translate />, cmds: ["trs"] },
  { path: "/json", component: <Json />, cmds: ["json"] },
  { path: "/crypt", component: <Crypt />, cmds: ["cry"] },
  { path: "/base64", component: <Base64 />, cmds: ["base"] },
  { path: "/md5", component: <Md5 />, cmds: ["md5"] },
  { path: "/aes", component: <Aes />, cmds: ["aes"] },
  { path: "/des", component: <Aes />, cmds: ["des"] },
];
