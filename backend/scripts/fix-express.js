const fs = require("fs");
const path = require("path");

const expressIndexPath = path.resolve(
  __dirname,
  "../node_modules/express/index.js"
);
const content = `'use strict';

const path = require('path');

module.exports = require(path.resolve(__dirname, './lib/express'));
`;

fs.writeFileSync(expressIndexPath, content, "utf8");
console.log("Fixed express index.js");
