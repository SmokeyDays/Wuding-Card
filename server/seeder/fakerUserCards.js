'use strict';

const _ = require('lodash');

module.exports = class {
  constructor(app) {
    this.app = app;
    this.user = '5e6bac2d84053b42b0450fa8';
  }
  async run() {
    await this.app.model.UserCard.deleteMany({ user: this.user });
    const cards = await this.app.model.Card.find().select('_id').limit(100);
    await this.app.model.UserCard.insertMany(_.range(100).map(item => ({
      user: '5e6bac2d84053b42b0450fa8',
      card: cards[item]._id,
    })));
  }
};
