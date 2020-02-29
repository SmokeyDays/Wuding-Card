'use strict';

const _ = require('lodash');

module.exports = class {
  constructor(app) {
    this.app = app;
  }
  async run() {
    // await this.app.model.
    let cards = require('../storage/cards.json');
    cards = _.uniqBy(cards, card => card[4]);
    cards = cards.map(card => ({
      weight: card[0], // 加权
      type: card[1], // 类型
      nature: card[2], // 属性
      group: card[3], // 门派
      name: card[4], // 名称
      level: card[5], // 修为
      cost: card[6], // 上场灵力
      upkeep: card[7], // 维持灵力
      condition: card[8], // 其他触发条件/代价
      effect: card[9], // 效果
      attack: card[10], // 攻击力
      defense: card[11], // 防御力
      endurance: card[12], // 耐力
    }));

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      await this.app.model.Card.findOneAndUpdate({ name: card.name }, card, { upsert: true });
    }

  }
};
