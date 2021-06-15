const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const commentSchema = Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'user',
    },
    discussionThread: {
      type: SchemaTypes.ObjectId,
      ref: 'discussion-thread',
    },
    text: String,
  },
  { timestamps: true }
);

commentSchema.plugin(toJSON);

const Comment = model('comment', commentSchema);

module.exports = Comment;
