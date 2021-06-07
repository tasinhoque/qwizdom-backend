const { Schema, model } = require('mongoose');
const { toJSON } = require('./plugins');

const schema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    backgroundImage: String,
  },
  { timestamps: true }
);

schema.plugin(toJSON);

const Category = model('Category', schema);

module.exports = Category;
