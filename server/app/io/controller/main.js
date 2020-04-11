'use strict';

const { Controller } = require('egg');
const gameState = {};
function gameStateInit( roomId, userId){
  if(gameState[roomId] == undefined){ gameState[roomId] = {}};
  if(gameState[roomId][userId] == undefined){ gameState[roomId][userId] = { charInfo: {}, cardState: {}}};
}
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
    const { roomId, userId, health } = ctx.args[0];
    gameStateInit( roomId, userId.socketId );
    gameState[roomId][userId.socketId].charInfo.health = health;
    const { charInfo } = gameState[roomId][userId.socketId];
    console.log(charInfo);
    await ctx.socket.to(roomId).broadcast.emit('changeCharInfo-by-opposite', {
      charInfo,
    });
  }
  async changeLevel() {
    const { ctx } = this;
    const { roomId, userId, level } = ctx.args[0];
    gameStateInit( roomId, userId.socketId );
    gameState[roomId][userId.socketId].charInfo.level = level;
    const { charInfo } = gameState[roomId][userId.socketId];
    console.log(charInfo);
    await ctx.socket.to(roomId).broadcast.emit('changeCharInfo-by-opposite', {
      charInfo,
    });
  }
  async changeMana() {
    const { ctx } = this;
    const { roomId, userId, mana } = ctx.args[0];
    gameStateInit( roomId, userId.socketId );
    gameState[roomId][userId.socketId].charInfo.mana = mana;
    const { charInfo } = gameState[roomId][userId.socketId];
    await ctx.socket.to(roomId).broadcast.emit('changeCharInfo-by-opposite', {
      charInfo,
    });
  }
};
