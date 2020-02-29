'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const Room = new Schema({
    name: {
      type: String,
      index: true,
    },
    autoDestroy: {
      type: Boolean,
      default: true,
    },
    allowWatch: {
      type: Boolean,
      default: true,
    },
  }, {
    timestamps: true,
  });

  return mongoose.model('Room', Room);
};

