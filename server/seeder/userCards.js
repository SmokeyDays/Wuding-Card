'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = class {
  constructor(app) {
    this.app = app;
  }
  async run() {
    let userCards = fs.readFileSync(path.join(__dirname, '../storage/userCards.txt')).toString();
    userCards = userCards.split('\n');
    userCards = userCards.map(item => item.split('\t').map(i => i.trim()));
    let cards = (await this.app.model.Card.find().select('_id name')).map(item => ({ _id: item._id, name: item.name }));
    cards = _.keyBy(cards, 'name');
    await this.app.model.UserCard.deleteMany({ user: '5e6bac2d84053b42b0450fa8' });
    for (let i = 0; i < userCards.length; i++) {
      const name = userCards[i][0];
      if (!cards[name]) {
        console.log(`${name}：未找到无卡牌`);
      } else {
        const someCards = _.range(Number(userCards[i][1])).map(() => ({
          user: '5e6bac2d84053b42b0450fa8',
          card: cards[name]._id,
        }));
        await this.app.model.UserCard.insertMany(someCards);
      }
    }
  }
};
