const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const leaderboardSchema = Schema(
  {
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

leaderboardSchema.plugin(toJSON);

const Leaderboard = model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;
