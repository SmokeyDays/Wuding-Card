'use strict';

const mongoose = require('mongoose');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');

// app/model目录
const APP_MODEL_DIR = path.join(__dirname, 'app/model');
// config/config.xx.js 配置文件路径
const CONFILG_FILE = path.join(__dirname, 'config/config.default');

const app = {
  model: {},
  mongoose,
};


const modelFiles = fs.readdirSync(APP_MODEL_DIR).filter(item => /\.js$/.test(item));

modelFiles.forEach(item => {
  try {
    const modelName = _.upperFirst(_.camelCase(item.slice(0, -3)));
    app.model[modelName] = require(`${APP_MODEL_DIR}/${item}`)(app);
  } catch (e) {
    throw e;
  }
});


const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log('用法');
  console.log('\tscript [run] --name=${seederFileName}\t执行');
  console.log('\tscript back --name=${seederFileName}\t返回');
  return;
}

const mongooseConfig = require(CONFILG_FILE)({}).mongoose;
app.mongoose.connect(mongooseConfig.url, mongooseConfig.options);

// 处理的操作名
let action = 'run';
const testAction = args.find(item => /^--action\=\w+/.test(item));
if (testAction) {
  action = testAction.split('=')[1];
}

const name = args.find(item => /^--name\=\w+/.test(item)).split('=')[1];
const Seeder = require(`./seeder/${name}`);
const seeder = new Seeder(app);

seeder[action]().then(() => {
  app.mongoose.disconnect();
}).catch(error => {
  console.log(error);
  app.mongoose.disconnect();
});
