const { Schema, model, SchemaTypes } = require('mongoose');

const schema = Schema(
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

const DiscussionThread = model('DiscussionThread', schema);

module.exports = DiscussionThread;
