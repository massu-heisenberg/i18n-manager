const vscode = require("vscode");

function toUpperCase() {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    const upperCaseText = selectedText.toUpperCase();

    editor.edit((editBuilder) => {
      editBuilder.replace(selection, upperCaseText);
    });
  }
}

function toLowerCase() {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    const lowerCaseText = selectedText.toLowerCase();

    editor.edit((editBuilder) => {
      editBuilder.replace(selection, lowerCaseText);
    });
  }
}

module.exports = {
  toLowerCase,
  toUpperCase,
};
