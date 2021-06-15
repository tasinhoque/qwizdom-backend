const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const discussionThreadSchema = Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'user',
    },
    quiz: {
      type: SchemaTypes.ObjectId,
      ref: 'quiz',
    },
    text: String,
  },
  { timestamps: true }
);

discussionThreadSchema.plugin(toJSON);

const DiscussionThread = model('discussion-thread', discussionThreadSchema);

module.exports = DiscussionThread;
