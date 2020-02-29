'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserCard = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    card: {
      type: Schema.Types.ObjectId,
      ref: 'Card',
      // index: true,
    },
  }, {
    collection: 'user_cards',
  });

  return mongoose.model('UserCard', UserCard);
};
