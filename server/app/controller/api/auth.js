'use strict';

const { Controller } = require('egg');
const { Random } = require('mockjs');
const moment = require('moment');

module.exports = class AuthController extends Controller {
  /**
   * 登录
   * POST /api/login
   */
  async login() {
    const { ctx, app } = this;
    const { stub, nickName } = ctx.request.body;
    let user;
    // 有存根，根据存根查用户；无存根，新建用户
    // TODO: 可以考虑加一层验证码机制，防止利用重放新建大量用户
    if (stub) {
      user = await ctx.model.User.findOne({
        stub,
      });
    } else {
      user = await ctx.model.User.create({
        stub: Random.guid(),
        nickName: nickName || Random.cname(),
      });
    }
    if (stub && !user) {
      ctx.throw(400, '当前存根对应的用户不存在，请检查存根或新建用户');
    }
    const endTime = moment().add(365, 'd'); // 结束时间
    const expiresIn = 365 * 24 * 60 * 60; // 有效时间
    const accessToken = app.jwt.sign({
      userId: user._id,
    }, app.config.jwt.secret, { expiresIn });

    ctx.body = {
      accessToken,
      tokenType: 'Bearer',
      expiresIn,
      endTime: endTime.valueOf(),
      currentUser: user,
    };
  }

  /**
   * 当前登录用户
   * POST /api/current-user
   */
  async currentUser() {
    const { ctx } = this;
    const { userId } = ctx.state.user;
    const currentUser = await ctx.model.User.findById(userId);
    ctx.body = { currentUser };
  }
};
