const fs = require("fs");
const chalk = require("chalk");
const childProcess = require("child_process");

// Pure JavaScript wrapper to run the TypeScript files.

fs.lstat("dist/index.js", (err, stats) => {
  if (err || !stats.isFile()) {
    console.log(chalk.green(" > TypeScript output missing. Building them now. This may take a few seconds."));
    childProcess.execSync("npm run build");
    console.log(chalk.green(" > Done"));
  }

  require("./dist/index");
});
