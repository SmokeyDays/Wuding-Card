'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { io } = app;
  io.of('/').route('login', io.controller.main.login);
  io.of('/').route('join-room', io.controller.main.joinRoom);
};

