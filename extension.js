const vscode = require("vscode");
const fs = require("fs");

const SpecialCharacters = [",", "@", "&"];

function activate(context) {
  console.log("插件已经被激活");

  // 注册命令
  let commandOfGetFileState = vscode.commands.registerCommand(
    "getFileState",
    (uri) => {
      // 文件路径
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

      const stats = fs.statSync(filePath);
      console.log("stats", stats);
      console.log("isFile", stats.isFile());
    }
  );

  // 将命令放入其上下文对象中，使其生效
  context.subscriptions.push(commandOfGetFileState);
  context.subscriptions.push(
    vscode.commands.registerCommand(
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
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
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
    )
  );

  vscode.languages.registerDefinitionProvider(
    {
      scheme: "file",
      language: "javascript",
    },
    new I18NDefineProvider()
  );
}

class I18NDefineProvider {
  constructor() {}
  provideDefinition(document, position) {
    if (position.character <= 0) {
      return;
    }
    const range = document.getWordRangeAtPosition(position);
    if (!range) {
      return;
    }
    this.document = document;
    this.search = document.getText(range);
    this.range = range;

    if (this.strAt(-7) !== "$scope.") {
      return;
    }
    if (this.strAt(1) === "=") {
      return this.findScopeReference();
    }
    return this.findScopeDefine();
  }

  /**
   * 在搜索字符串的前后剪裁字符串
   */
  strAt(index) {
    if (this.range.start.character + index < 0) {
      return "";
    }
    if (index < 0) {
      const s = new vscode.Range(
        new vscode.Position(
          this.range.start.line,
          this.range.start.character + index
        ),
        this.range.start
      );
      return this.document.getText(this.document.validateRange(s));
    }
    return this.document.getText(
      new vscode.Range(
        this.range.end,
        new vscode.Position(
          this.range.end.line,
          this.range.end.character + index
        )
      )
    );
  }

  findScopeDefine() {
    const thisDocIndex = this.document
      .getText()
      .indexOf(`scope.${this.search} = `);
    if (thisDocIndex === -1) {
      return;
    }
    return new vscode.Location(
      vscode.Uri.file(this.document.fileName),
      new vscode.Range(
        this.document.positionAt(thisDocIndex + 6),
        this.document.positionAt(thisDocIndex + 6 + this.search.length)
      )
    );
  }

  findScopeReference() {
    const thisDocArr = [
      ...this.document
        .getText()
        .matchAll(new RegExp("scope." + this.search, "g")),
    ];
    if (!thisDocArr.length) {
      return;
    }
    return thisDocArr.map((item) => {
      return new vscode.Location(
        vscode.Uri.file(this.document.fileName),
        new vscode.Range(
          this.document.positionAt(item.index + 6),
          this.document.positionAt(item.index + 6 + this.search.length)
        )
      );
    });
  }
}

// 示例：查找标识符的定义位置
function findDefinition(document, position) {
  // 在这里实现查找定义位置的逻辑，返回定义位置的 Position 对象
  // 如果找到定义，返回 Position 对象；否则，返回 null
}

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

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
