const os = require("os");
const fs = require("fs");
const path = require("path");

const env = fs.readFileSync(path.join(__dirname, "../../.env.local")).toString();

const extractLocalVariable = (key) => {
  const result = env
    .split(os.EOL)
    .map((x) => x.split("="))
    .filter((x) => x[0] === key);
  return result.length ? result.shift().pop() : undefined;
};

module.exports = { extractLocalVariable };
