const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON, paginate } = require('./plugins');

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
    title: String,
    text: String,
    image: String,
    totalComments: {
      type: Number,
      default: 0,
    },
    upvotes: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'user',
      },
    ],
    downvotes: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'user',
      },
    ],
  },
  { timestamps: true }
);

discussionThreadSchema.plugin(toJSON);
discussionThreadSchema.plugin(paginate);

const DiscussionThread = model('discussion-thread', discussionThreadSchema);

module.exports = DiscussionThread;
