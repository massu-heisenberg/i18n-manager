const vscode = require("vscode");
const { SpecialCharacters } = require("../../utils/constants");
module.exports = {
  spliceWithUnderscore: vscode.commands.registerCommand(
    "vscodeCustomPlugin.spliceWithUnderscore",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        const spliceWithUnderscore = selectedText
          .replace(/,/g, " ")
          .split(" ")
          .filter((s) => !SpecialCharacters.includes(s))
          .join("_");

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, spliceWithUnderscore);
        });
      }
    }
  ),
  spliceWithUnderscoreAndLowerCase: vscode.commands.registerCommand(
    "vscodeCustomPlugin.spliceWithUnderscoreAndLowerCase",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        const lowerCaseText = selectedText.toLowerCase();
        const spliceWithUnderscore = lowerCaseText
          .replace(/,/g, " ")
          .split(" ")
          .filter((s) => s && !SpecialCharacters.includes(s))
          .join("_");

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, spliceWithUnderscore);
        });
      }
    }
  ),
};
