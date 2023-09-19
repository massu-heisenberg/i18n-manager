const {
  spliceWithUnderscore,
  spliceWithUnderscoreAndLowerCase,
} = require("./text/splice-with-underscore");
const { log } = require("../utils/log");
const { customDotLog, customDotLogCommander } = require("./log/dot");
const i18nManagerDetect = require("./i18n-manager/detect");

function activate(context) {
  log("massu vscode has been active!");
  context.subscriptions.push(
    spliceWithUnderscore,
    spliceWithUnderscoreAndLowerCase,
    customDotLog,
    customDotLogCommander,
    i18nManagerDetect
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
