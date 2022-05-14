const install = require('npm-install-package');
const fs = require('fs');

const saveOpts = { save: true, cache: true };
const saveDevOpts = { saveDev: true, cache: true };

exports.suite = () => {
  const savePackageNames = ['react', 'react-dom'];

  const saveDevPackageNames = [
    'electron',
    'electron-reload',
    'typescript', 'ts-node', '@types/node',
    '@types/react', '@types/react-dom',
    'webpack', 'webpack-cli',
    'ts-loader', 'css-loader', 'mini-css-extract-plugin', 'html-webpack-plugin', '@types/mini-css-extract-plugin',
    'rimraf', 'cross-env', 'npm-run-all'
  ];

  var packageJson;
  new Promise((resolve) => {
    install(savePackageNames, saveOpts, (err) => {
      if (err) throw err;
      return resolve(JSON.parse(fs.readFileSync('./package.json')).dependencies);
    });
  }).then((result) => {
    install(saveDevPackageNames, saveDevOpts, (err) => {
      if (err) throw err;
      packageJson = JSON.parse(fs.readFileSync('./package.json'));
      packageJson.dependencies = result;
      fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2), 'utf-8');
    });
  });
}

exports.electron = () => {
  const packageNames = ['electron'];
  install(packageNames, saveDevOpts, (err) => {
    if (err) throw err;
  });
}

exports.electron_reload = () => {
  const packageNames = ['electron-reload'];
  install(packageNames, saveDevOpts, (err) => {
    if (err) throw err;
  });
}

exports.typescript = () => {
  const packageNames = ['typescript', 'ts-node', '@types/node'];
  install(packageNames, saveDevOpts, (err) => {
    if (err) throw err;
  });
}

exports.react = () => {
  const packageNames = ['react', 'react-dom'];
  install(packageNames, (err) => {
    if (err) throw err;
  });
}

exports.react_types = () => {
  const packageNames = ['@types/react', '@types/react-dom'];
  install(packageNames, saveDevOpts, (err) => {
    if (err) throw err;
  });
}

exports.webpack = () => {
  const packageNames = ['webpack', 'webpack-cli'];
  install(packageNames, saveDevOpts, (err) => {
    if (err) throw err;
  });
}

exports.webpack_bundle = () => {
  const packageNames = ['ts-loader', 'css-loader', 'mini-css-extract-plugin', 'html-webpack-plugin', '@types/mini-css-extract-plugin'];
  install(packageNames, saveDevOpts, (err) => {
    if (err) throw err;
  });
}

exports.utils = () => {
  const packageNames = ['rimraf', 'cross-env', 'npm-run-all'];
  install(packageNames, saveDevOpts, (err) => {
    if (err) throw err;
  });
}

