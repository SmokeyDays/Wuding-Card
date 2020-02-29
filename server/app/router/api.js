'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiController = app.controller.api;
  const apiRouter = app.router.namespace('/api');
  const mustAuth = app.jwt;

  apiRouter.post('/login', apiController.auth.login); // 登录
  apiRouter.post('/current-user', mustAuth, apiController.auth.currentUser); // 登录
  apiRouter.post('/room/list', apiController.room.roomList); // 房间列表
  apiRouter.post('/room/create', apiController.room.create); // 房间列表
  apiRouter.post('/card/my-card-groups', mustAuth, apiController.card.myCardGroups); // 卡组列表
};
