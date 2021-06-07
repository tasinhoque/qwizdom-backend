const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const commentSchema = Schema(
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

commentSchema.plugin(toJSON);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
