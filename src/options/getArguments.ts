import * as fs from "fs";

function readArgumentsFile(): string[] {
  // First make sure that the arguments file exists
  // If it doesn't then nothing bad will happen
  try {
    const stat = fs.statSync("arguments.txt");
    if (!stat.isFile()) {
      return [];
    }
  } catch (e) {
    return [];
  }

  // Read the arguments file
  const content = fs.readFileSync("arguments.txt");
  const lines = content.toString().split("\n");
  const result: string[] = [];

  for (const line of lines) {
    // Lines that start with # are comments
    if (line.startsWith("#")) {
      continue;
    }
    // Trim line endings and other characters
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
