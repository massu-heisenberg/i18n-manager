const vscode = require("vscode");
const fs = require("fs");

const getFileState = (uri) => {
  const filePath = uri.path.substring(1);
  fs.stat(filePath, (err, stats) => {
    if (err) {
      vscode.window.showErrorMessage(`获取文件时遇到错误了${err}!!!`);
    }

    if (stats.isDirectory()) {
      vscode.window.showWarningMessage(
        `检测的是文件夹，不是文件，请重新选择！！！`
      );
    }

    if (stats.isFile()) {
      const size = stats.size;
      const createTime = stats.birthtime.toLocaleString();
      const modifyTime = stats.mtime.toLocaleString();

      vscode.window.showInformationMessage(
        `
                  文件大小为:${size}字节;
                  文件创建时间为:${createTime};
                  文件修改时间为:${modifyTime}
              `,
        { modal: true }
      );
    }
  });
};

module.exports = vscode.commands.registerCommand("getFileState", (uri) =>
  getFileState(uri)
);
