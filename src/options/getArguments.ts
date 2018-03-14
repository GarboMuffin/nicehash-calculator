import * as fs from "fs";

function readArgumentsFile() {
  const content = fs.readFileSync("arguments.txt");
  const lines = content.toString().split("\n");
  const result: string[] = [];

  for (const line of lines) {
    // Lines that start with # are comments
    if (line.startsWith("#")) {
      continue;
    }
    // Trim it to avoid newlines and other characters
    const trimmed = line.trim();
    // Ignore empty lines
    if (trimmed === "") {
      continue;
    }
    result.push(trimmed);
  }

  return result;
}

export function getArguments() {
  let args = process.argv.splice(2);
  args = args.concat(readArgumentsFile());
  return args;
}
