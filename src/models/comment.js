const { Schema, model, SchemaTypes } = require('mongoose');

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

const Comment = model('Comment', schema);

module.exports = Comment;
