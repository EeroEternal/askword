const { app } = require("electron");

const ask_menu = [
  {
    label: app.getName(),
    submenu: [
      {
        role: "设置",
        role: "推出",
      },
    ],
  },
  {
    label: "编辑",
    submenu: [
      { role: "撤回" },
      { role: "重做" },
      { type: "separator" },
      { role: "剪切" },
      { role: "复制" },
      { role: "黏贴" },
    ],
  },
  {
    label: "帮助",
    submenu: [{ role: "关于" }],
  },
];

module.exports = { ask_menu };
