'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const Card = new Schema({
    weight: {
      type: String,
    }, // 加权
    type: {
      type: String,
    }, // 类型
    nature: {
      type: String,
    }, // 属性
    group: {
      type: String,
    }, // 门派
    name: {
      type: String,
      index: true,
      unique: true,
    }, // 名称
    level: {
      type: String,
    }, // 修为
    cost: {
      type: String,
    }, // 上场灵力
    upkeep: {
      type: String,
    }, // 维持灵力
    condition: {
      type: String,
    }, // 其他触发条件/代价
    effect: {
      type: String,
    }, // 效果
    attack: {
      type: String,
    }, // 攻击力
    defense: {
      type: String,
    }, // 防御力
    endurance: {
      type: String,
    }, // 耐力
  });

  return mongoose.model('Card', Card);
};

