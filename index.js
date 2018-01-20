const fs = require("fs");
const chalk = require("chalk");
const childProcess = require("child_process");

try {
  const stat = fs.lstatSync("dist/index.js").isFile();
} catch (e) {
  console.log(" > TypeScript (tsc) build files missing. Building them now.");
  childProcess.execSync("npm run build");
  console.log(" > Done");
}

require("./dist/index");
