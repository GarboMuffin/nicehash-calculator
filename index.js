const fs = require("fs");
const chalk = require("chalk");

const stat = fs.statSync("dist");
if (stat.isDirectory()) {
  require("./dist/index");
} else {
  console.error(chalk.red("Couldn't find TypeScript (tsc) output!"));
  console.error(chalk.red("Please run: ") + chalk.reset("npm run build"));
}
