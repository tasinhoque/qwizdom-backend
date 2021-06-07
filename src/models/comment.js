const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const schema = Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    text: String,
  },
  { timestamps: true }
);

schema.plugin(toJSON);

const Comment = model('Comment', schema);

module.exports = Comment;
