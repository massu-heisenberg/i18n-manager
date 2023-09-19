const vscode = require("vscode");
module.exports = vscode.commands.registerCommand('i18nManager.detect', (uri) => {
    const rootPath = vscode.workspace.rootPath;
    const projectPath = uri.fsPath;
    console.log(uri.fsPath, rootPath);
    const i18nExtRegx = /^i18n-/;
});