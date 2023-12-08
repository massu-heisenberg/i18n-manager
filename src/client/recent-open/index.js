const vscode = require("vscode");

let recentFiles = [];
function recentOpenFiles(context) {
  // 注册文档打开事件
  vscode.workspace.onDidOpenTextDocument((document) => {
    // 获取打开的文件路径
    // 
    const filePath = document.uri.fsPath;
    const scheme = document.uri.scheme;
    if (filePath && scheme === "file") {
      recentFiles.unshift(filePath); // 将文件路径添加到数组的开头
      // 重新排列打开的文件顺序
      rearrangeOpenFiles();
    }
    console.log(`最新打开的文件: ${filePath}`);
  });

  // 监听文档关闭事件
  vscode.workspace.onDidCloseTextDocument(() => {
    // 重新排列打开的文件顺序
    rearrangeOpenFiles();
  });

  // 监听文档关闭事件
  //   vscode.workspace.onDidCloseTextDocument((document) => {
  //     const filePath = document.uri.fsPath;
  //     const isExist = recentFiles.find((f) => f === filePath);
  //     if (isExist) {
  //       recentFiles = recentFiles.filter((f) => f !== filePath);
  //     }
  //     if (vscode.workspace.textDocuments.length === 0) {
  //       // 如果没有打开的文档，清空 recentFiles 数组
  //       recentFiles = [];
  //       console.log("没有打开的文档，清空最近打开的文件列表");
  //     }
  //   });
}

function rearrangeOpenFiles() {
  // 获取当前打开的编辑器
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    // 获取当前打开文件的路径
    const currentFilePath = activeEditor.document.uri.fsPath;

    // 移除当前打开的文件路径
    recentFiles = recentFiles.filter(
      (filePath) => filePath !== currentFilePath
    );

    // 将当前打开的文件路径放到数组的最左边
    recentFiles.unshift(currentFilePath);

    openRecentFiles();
  }
}

function openRecentFiles() {
  // 从右到左依次打开最近打开的文件
  recentFiles.forEach((filePath) => {
    vscode.commands.executeCommand("vscode.open", vscode.Uri.file(filePath));
  });
}

module.exports = {
  recentOpenFiles: recentOpenFiles,
};
