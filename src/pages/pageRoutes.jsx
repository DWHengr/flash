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
import Cmd from "./Cmd";

export const optionPageRoutes = [
  { path: "/default", component: <Default /> },
  {
    path: "/personal/setting",
    cmds: ["set"],
    icon: "/set.png",
    describe: "设置页",
  },
  { path: "/personal", cmds: ["pre"], icon: "/pre.png", describe: "个人中心" },
  {
    path: "/option",
    component: <Option />,
    cmds: ["", "opt", "link"],
    icon: "/opt.png",
    describe: "选项设置",
  },
  {
    path: "/cmd",
    component: <Cmd />,
    cmds: ["cmd"],
    icon: "/cmd.png",
    describe: "命令列表",
  },
  {
    path: "/engine",
    component: <Engine />,
    cmds: ["eng", "baidu", "biying", "csdn"],
    icon: "/eng.png",
    describe: "搜索引擎",
  },
  {
    path: "/variablename",
    component: <VariableName />,
    cmds: ["var"],
    icon: "/var.png",
    describe: "变量命名",
  },
  {
    path: "/translate",
    component: <Translate />,
    cmds: ["trs"],
    icon: "/trs.png",
    describe: "中英翻译",
  },
  {
    path: "/json",
    component: <Json />,
    cmds: ["json"],
    icon: "/json.png",
    describe: "json数据格式化",
  },
  // {
  //   path: "/crypt",
  //   component: <Crypt />,
  //   cmds: ["cry"],
  //   icon: "",
  //   describe: "加密工具",
  // },
  {
    path: "/base64",
    component: <Base64 />,
    cmds: ["base"],
    icon: "/base.png",
    describe: "base64编码",
  },
  {
    path: "/md5",
    component: <Md5 />,
    cmds: ["md5"],
    icon: "/md5.png",
    describe: "md5加密/解密",
  },
  {
    path: "/aes",
    component: <Aes />,
    cmds: ["aes"],
    icon: "/aes.png",
    describe: "aes加密/解密",
  },
  {
    path: "/des",
    component: <Aes />,
    cmds: ["des"],
    icon: "/des.png",
    describe: "des加密/解密",
  },
];