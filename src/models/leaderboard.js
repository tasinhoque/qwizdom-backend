const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const leaderboardSchema = Schema(
  {
    quiz: {
      type: SchemaTypes.ObjectId,
      ref: 'quiz',
    },
    participants: [
      {
        user: {
          type: SchemaTypes.ObjectId,
          ref: 'user',
        },
        rank: Number,
        marks: Number,
      },
    ],
  },
  { timestamps: true }
);

leaderboardSchema.plugin(toJSON);

const Leaderboard = model('leaderboard', leaderboardSchema);

module.exports = Leaderboard;
