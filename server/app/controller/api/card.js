'use strict';

const { Controller } = require('egg');

module.exports = class GameController extends Controller {
  /**
   * 我的卡组
   * POST /card/my-card-groups
   */
  async myCardGroups() {
    const { ctx } = this;
    const { userId } = ctx.state.user;
    const myCardGroups = await ctx.model.UserCard.find({ user: userId }).populate('card');
    ctx.body = {
      myCardGroups,
    };
  }

};
