const commandOfGetFileState = require("./getFileState");
const {
  spliceWithUnderscore,
  spliceWithUnderscoreAndLowerCase,
} = require("./textHandler");
const { log } = require("../utils/log");
const { customDotLog, customDotLogCommander } = require("./customDotLog");

function activate(context) {
  log("VS Code Custom Plugin has been active!");
  context.subscriptions.push(
    commandOfGetFileState,
    spliceWithUnderscore,
    spliceWithUnderscoreAndLowerCase,
    customDotLog,
    customDotLogCommander
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
