const vscode = require("vscode");

class CompletionItemProvider {
  constructor(config) {
    this.config = config;
  }

  provideCompletionItems(_, position) {
    this.position = position;
    const completions = this.config.map((item) => {
      const snippetCompletion = new vscode.CompletionItem(
        item.trigger,
        vscode.CompletionItemKind.Operator
      );
      snippetCompletion.documentation = new vscode.MarkdownString(
        item.description
      );
      return snippetCompletion;
    });

    return completions;
  }

  resolveCompletionItem(item) {
    const label = item.label;
    if (this.position && this.config && typeof label === "string") {
      const config = this.config.find((config) => config.trigger === label);
      item.command = {
        command: "dot-log-replace",
        title: "refactor",
        arguments: [this.position.translate(0, label.length + 1), config],
      };
    }

    return item;
  }
}

class CustomDotLog {
  constructor(context) {
    this.context = context;
    this.customDotConfig = vscode.workspace.getConfiguration("customDotLog");
    this.configList = this.customDotConfig.get("config");
  }

  activeDotLog() {
    return vscode.languages.registerCompletionItemProvider(
      [
        "html",
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "vue",
      ],
      new CompletionItemProvider(this.configList),
      "."
    );
  }

  activeDotLogCommander() {
    const command = "dot-log-replace";
    const commandHandler = (editor, edit, position, config) => {
      const lineText = editor.document.lineAt(position).text;
      // match case name.log etc.
      const matchVarReg = new RegExp(
        `\(\[^\\s\]*\[^\'\"\`\]\).${config.trigger}$`
      );
      // match case 'name'.log etc.  /(['"`])([^'"])\1.log/
      const matchStrReg = new RegExp(
        `\(\[\'\"\`\]\)\(\[^\'\"\`\]*\)\\1\.${config.trigger}$`
      );
      let matchFlag = "var";
      let text,
        key,
        quote = "'",
        insertVal = "";
      [text, key] = lineText.match(matchVarReg) || [];
      if (!key) {
        [text, quote, key] = lineText.match(matchStrReg) || [];
        matchFlag = "str";
      }
      // if matched
      if (key) {
        const index = lineText.indexOf(text);
        edit.delete(
          new vscode.Range(
            position.with(undefined, index),
            position.with(undefined, index + text.length)
          )
        );
        const prefix = config.prefix || "";
        const suffix = config.suffix || "";

        if (matchFlag === "var" && key.includes("'")) {
          quote = '"';
        }
        // format like console.log("xxx", xxx)
        if (matchFlag === "var") {
          //  only console.log(xxx)
          if (config.hideName === true) {
            insertVal = `${config.format}(${key});`;
          } else {
            insertVal = `${config.format}(${quote}${prefix}${key}${suffix}${quote}, ${key});`;
          }
        }
        // if key is string format like console.log("xxx")
        if (matchFlag === "str") {
          insertVal = `${config.format}(${quote}${key}${quote});`;
        }

        edit.insert(position.with(undefined, index), insertVal);
      }

      return Promise.resolve([]);
    };
    return vscode.commands.registerTextEditorCommand(command, commandHandler);
  }
}

const dotLog = new CustomDotLog();

module.exports = {
  customDotLog: dotLog.activeDotLog(),
  customDotLogCommander: dotLog.activeDotLogCommander(),
};
