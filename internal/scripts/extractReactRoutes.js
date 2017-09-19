import { removeSync, copySync, writeFileSync } from 'fs-extra';
import superagent from 'superagent';
import path from 'path';
import webpack from 'webpack';
// import _ from 'lodash';
import appRootDir from 'app-root-dir';
import config from '../../config';
import configFactory from '../webpack/configFactory';

const webpackConfig = configFactory({ target: 'server', optimize: true });
webpackConfig.entry.App = path.resolve(appRootDir.get(), 'shared/MainApp.js');
webpackConfig.output.path = path.resolve(appRootDir.get(), config('buildOutputPath'), 'static', 'temp');

const compiler = webpack(webpackConfig);
compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stats.toString({ colors: true }));
});


// console.log(webpackConfig.output);
// console.log(path.resolve(appRootDir.get(), config('buildOutputPath')));

