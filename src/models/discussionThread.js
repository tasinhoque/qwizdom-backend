const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const discussionThreadSchema = Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    text: String,
    comments: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

discussionThreadSchema.plugin(toJSON);

const DiscussionThread = model('DiscussionThread', discussionThreadSchema);

module.exports = DiscussionThread;
