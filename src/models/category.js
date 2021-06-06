const { Schema, model } = require('mongoose');

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

const Category = model('Category', schema);

module.exports = Category;
