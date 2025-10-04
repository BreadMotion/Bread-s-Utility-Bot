const fs = require("fs");
const BotManager = require("./Class/BotManager");

/** 指定ディレクトリのJSファイル一覧読み込み
 * @param {String} fileLayer
 * @return {string[]} */
function GetJSFile(fileLayer) {
  var files = fs.readdirSync(fileLayer);
  return files.filter((file) => file.endsWith(".js"));
}

/** 外部ファイルのモジュール読み込み
 * @param {string[]} src
 * @param {string} fileLayer
 * @return {*} */
function LoadModule(src, fileLayer) {
  let result = {};
  for (const file of src) {
    const item = require(`./${fileLayer}/${file}`);
    result[item.name] = item;
  }
  return result;
}

// ボットの作成
new BotManager(
  LoadModule(GetJSFile("./Event"), "Event"),
  LoadModule(GetJSFile("./Command"), "Command"),
  LoadModule(GetJSFile("./Event/Button"), "Event/Button")
);
