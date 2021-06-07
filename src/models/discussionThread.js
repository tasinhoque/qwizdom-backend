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
    comments: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

schema.plugin(toJSON);

const DiscussionThread = model('DiscussionThread', schema);

module.exports = DiscussionThread;
