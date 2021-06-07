const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const schema = Schema(
  {
    quiz: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'Quiz',
    },
    participants: [
      {
        user: {
          type: SchemaTypes.ObjectId,
          ref: 'User',
        },
        rank: Number,
        marks: Number,
      },
    ],
  },
  { timestamps: true }
);

schema.plugin(toJSON);

const Leaderboard = model('Leaderboard', schema);

module.exports = Leaderboard;
