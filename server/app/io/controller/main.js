'use strict';

const { Controller } = require('egg');

module.exports = class MainController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { accessToken } = ctx.args[0] || {};
    const { userId } = app.jwt.verify(accessToken, app.config.jwt.srcret);
    const user = await ctx.model.User.findOneAndUpdate({ _id: userId }, { socketId: ctx.socket.id }, { new: true });
    await ctx.socket.emit('login-success', { user });
  }
  async joinRoom() {
    const { ctx } = this;
    const { roomId, action } = ctx.args[0];
    // TODO: 判断room
    // console.log(ctx.socket.id);
    await ctx.socket.join(roomId);
    await ctx.socket.to(roomId).broadcast.emit('someone-joined-room', {
      socketId: ctx.socket.id,
    });
    await ctx.socket.to(roomId).broadcast.emit(`someone-ready-${action}`, {
      socketId: ctx.socket.id,
    });
  }
  async changeHealth() {
    const { ctx } = this;
    const { roomId, health } = ctx.args[0];
    await ctx.socket.to(roomId).broadcast.emit('changeHealth-by-opposite', {
      health,
    });
  }
  async changeLevel() {
    const { ctx } = this;
    const { roomId, level } = ctx.args[0];
    await ctx.socket.to(roomId).broadcast.emit('changeLevel-by-opposite', {
      level,
    });
  }
  async changeMana() {
    const { ctx } = this;
    const { roomId, mana } = ctx.args[0];
    await ctx.socket.to(roomId).broadcast.emit('changeMana-by-opposite', {
      mana,
    });
  }
};
