'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const User = new Schema({
    nickName: {
      type: String,
    },
    stub: {
      type: String,
      index: true,
    },
    socketId: {
      type: String,
      // index: true,
    }, // socket id
  }, {
    timestamps: true,
  });

  return mongoose.model('User', User);
};

