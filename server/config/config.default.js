/* eslint valid-jsdoc: "off" */

'use strict';

const CONFIG = require('../.config');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    keys: appInfo.name + '_1582770760032_457',
    middleware: [],
    cluster: {
      listen: {
        port: CONFIG.port, // 启动端口
      },
    },
    security: {
      csrf: false,
    },
    cors: {
      origin: ctx => ctx.request.header.origin,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    mongoose: {
      url: CONFIG.mongodbUrl,
      options: {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
    jwt: {
      secret: CONFIG.jwtSecret,
    },
    io: {
      init: { },
      namespace: {
        '/': {
          connectionMiddleware: [],
          packetMiddleware: [],
        },
      },
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
