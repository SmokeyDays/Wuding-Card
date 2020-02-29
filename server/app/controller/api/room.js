'use strict';

const { Controller } = require('egg');
const { Random } = require('mockjs');
const moment = require('moment');

module.exports = class RoomController extends Controller {
  /**
   * 房间列表
   * POST /api/room/list
   */
  async roomList() {
    const { ctx } = this;
    const { page = {}, filters = {} } = ctx.request.body;
    const { current = 1, pageSize = 15 } = page;
    const listQuery = ctx.model.Room.find();
    if (filters.name) {
      listQuery.where({ name: { $regex: filters.name } });
    }
    if (filters.id) {
      listQuery.where({ _id: filters.id });
    }
    if (filters.keyword) {
      if (filters.keyword.length === 24) {
        listQuery.where({ _id: filters.keyword });
      } else {
        listQuery.where({ name: { $regex: filters.keyword } });
      }
    }

    const roomsTotal = await listQuery.toConstructor()().count();
    const rooms = await listQuery
      .skip(pageSize * (current - 1))
      .limit(pageSize)
      .sort('-_id');
    ctx.body = {
      rooms,
      roomsTotal,
    };
  }

  /**
   * 创建房间
   * POST /api/room/create
   */
  async create() {
    const { ctx } = this;
    const { name, autoDestroy, allowWatch } = ctx.request.body;
    const room = await ctx.model.Room.create({ name, autoDestroy, allowWatch });
    ctx.body = {
      room,
    };
  }
};
