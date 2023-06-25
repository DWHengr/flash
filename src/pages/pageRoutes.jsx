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
import Color from "./Color";
import Schedule from "./Schedule";
import { Timestamp } from "./Timestamp";
import Url from "./Url";
import Utf from "./Utf";
import Cae from "./Cae";
import ReplaceText from "./ReplaceText";

export const optionPageRoutes = [
  { path: "/default", component: <Default />, overflow: true },
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
    overflow: true,
  },
  {
    path: "/cmd",
    component: <Cmd />,
    cmds: ["cmd"],
    icon: "/cmd.png",
    describe: "命令列表",
    overflow: true,
  },
  {
    path: "/engine",
    component: <Engine />,
    cmds: ["eng", "baidu", "biying", "csdn"],
    icon: "/eng.png",
    describe: "搜索引擎",
    overflow: true,
  },
  {
    path: "/variablename",
    component: <VariableName />,
    cmds: ["var"],
    icon: "/var.png",
    describe: "变量命名",
    overflow: true,
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
    path: "/url",
    component: <Url />,
    cmds: ["url"],
    icon: "/url.png",
    describe: "url编码/解码",
  },
  {
    path: "/utf",
    component: <Utf />,
    cmds: ["utf"],
    icon: "/utf.png",
    describe: "utf编码/解码",
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
  {
    path: "/cae",
    component: <Cae />,
    cmds: ["cae"],
    icon: "/cae.png",
    describe: "大小写转换",
  },
  {
    path: "/cor",
    component: <Color />,
    cmds: ["cor"],
    icon: "/cor.png",
    describe: "色卡",
  },
  {
    path: "/sce",
    component: <Schedule />,
    cmds: ["sce"],
    icon: "/sce.png",
    describe: "日程",
  },
  {
    path: "/tip",
    component: <Timestamp />,
    cmds: ["tip"],
    icon: "/tip.png",
    describe: "时间戳",
  },
  {
    path: "/rtx",
    component: <ReplaceText />,
    cmds: ["rtx"],
    icon: "/rtx.png",
    describe: "替换文本内容",
  },
];
