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
  { path: "/personal/setting", cmds: ["set"], icon: "", describe: "设置页" },
  { path: "/personal", cmds: ["pre"], icon: "", describe: "个人中心" },
  {
    path: "/option",
    component: <Option />,
    cmds: ["", "opt", "link"],
    icon: "",
    describe: "选项设置",
  },
  {
    path: "/engine",
    component: <Engine />,
    cmds: ["eng", "baidu", "biying", "csdn"],
    icon: "",
    describe: "搜索引擎",
  },
  {
    path: "/variablename",
    component: <VariableName />,
    cmds: ["var"],
    icon: "",
    describe: "变量命名",
  },
  {
    path: "/translate",
    component: <Translate />,
    cmds: ["trs"],
    icon: "",
    describe: "中英翻译",
  },
  {
    path: "/json",
    component: <Json />,
    cmds: ["json"],
    icon: "",
    describe: "json数据格式化",
  },
  {
    path: "/crypt",
    component: <Crypt />,
    cmds: ["cry"],
    icon: "",
    describe: "加密工具",
  },
  {
    path: "/base64",
    component: <Base64 />,
    cmds: ["base"],
    icon: "",
    describe: "base64编码",
  },
  {
    path: "/md5",
    component: <Md5 />,
    cmds: ["md5"],
    icon: "",
    describe: "md5加密/解密",
  },
  {
    path: "/aes",
    component: <Aes />,
    cmds: ["aes"],
    icon: "",
    describe: "aes加密/解密",
  },
  {
    path: "/des",
    component: <Aes />,
    cmds: ["des"],
    icon: "",
    describe: "des加密/解密",
  },
];
