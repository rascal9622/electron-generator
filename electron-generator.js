const fs = require('fs');
const path = require('path');

const package_json = require('./lib/package-json');
const npm_install_package = require('./lib/npm-intaller');
const tsconfig_json = require('./lib/tsconfig-json');
const webpackconfig = require('./lib/webpack-config');
const contents = require('./lib/contents');

const AppName = 'app';

const main = () => {
  fs.mkdirSync(path.resolve(__dirname, AppName, 'src' , '@types'), { recursive: true });
  process.chdir(path.resolve(__dirname, AppName));

  package_json.create();
  npm_install_package.suite();
  tsconfig_json.create();
  webpackconfig.create();

  contents.main_ts_create();
  contents.index_html_create();
  contents.preload_ts_create();
  contents.renderer_tsx_create();
  contents.global_d_ts_create();
}

main();