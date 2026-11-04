const fs = require('fs');
const path = require('path');

const lockfilePath = path.join(__dirname, '..', 'package-lock.json');
const content = fs.readFileSync(lockfilePath, 'utf8');

const target = '"node_modules/mongodb-memory-server-core/node_modules/mongodb": {';
const addition = `"node_modules/mongodb-memory-server-core/node_modules/gcp-metadata": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/gcp-metadata/-/gcp-metadata-7.0.1.tgz",
      "integrity": "sha512-UcO3kefx6dCcZkgcTGgVOTFb7b1LlQ02hY1omMjjrrBzkajRMCFgYOjs7J71WqnuG1k2b+9ppGL7FsOfhZMQKQ==",
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "peer": true,
      "dependencies": {
        "gaxios": "^7.0.0",
        "google-logging-utils": "^1.0.0",
        "json-bigint": "^1.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    `;

if (content.includes(target) && !content.includes('node_modules/mongodb-memory-server-core/node_modules/gcp-metadata')) {
  const newContent = content.replace(target, addition + target);
  fs.writeFileSync(lockfilePath, newContent, 'utf8');
  console.log('Successfully inserted gcp-metadata into package-lock.json');
} else {
  console.log('Target not found or already present');
}

