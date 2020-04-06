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
    const myCardGroups = await ctx.model.UserCard.find({ user: userId });
    ctx.body = {
      myCardGroups,
      cardInfos: [],
    };
  }

  /**
   * 卡牌信息
   * POST /card/card-infos
   */
  async cardInfos() {
    const { ctx } = this;
    const { cardIds } = ctx.request.body;
    const cardInfos = await ctx.model.Card.find({ _id: { $in: cardIds.map(item => ctx.app.mongoose.Types.ObjectId(item)) } });
    ctx.body = {
      cardInfos,
    };
  }

};
