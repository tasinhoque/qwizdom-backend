const { Schema, model } = require('mongoose');
const { toJSON } = require('./plugins');

const categorySchema = Schema(
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

categorySchema.plugin(toJSON);

const Category = model('category', categorySchema);

module.exports = Category;
