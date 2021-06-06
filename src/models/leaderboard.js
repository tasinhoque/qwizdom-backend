const { Schema, model, SchemaTypes } = require('mongoose');

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

const Leaderboard = model('Leaderboard', schema);

module.exports = Leaderboard;
