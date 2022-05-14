const fs = require('fs');

exports.create = (AppName) => {
  const packageJson = {
    "name": AppName,
    "version": "1.0.0",
    "description": "",
    "main": "dist/main.js",
    "scripts": {
      "start": "run-s clean build serve",
      "clean": "rimraf dist",
      "build": "cross-env NODE_ENV=\"development\" webpack --progress",
      "serve": "electron ."
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
  }

  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2), 'utf-8');
}