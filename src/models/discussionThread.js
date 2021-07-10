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
    text: String,
    image: String,
  },
  { timestamps: true }
);

discussionThreadSchema.plugin(toJSON);
discussionThreadSchema.plugin(paginate);

const DiscussionThread = model('discussion-thread', discussionThreadSchema);

module.exports = DiscussionThread;
