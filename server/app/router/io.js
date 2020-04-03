'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { io } = app;
  io.of('/').route('login', io.controller.main.login);
  io.of('/').route('join-room', io.controller.main.joinRoom);
  io.of('/').route('changeHealth', io.controller.main.changeHealth);
  io.of('/').route('changeLevel', io.controller.main.changeLevel);
  io.of('/').route('changeMana', io.controller.main.changeMana);
};

