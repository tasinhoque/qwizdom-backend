const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const stageSchema = Schema(
  {
    quiz: {
      type: SchemaTypes.ObjectId,
      ref: 'quiz',
    },
    serial: Number,
  },
  { timestamps: true }
);

stageSchema.plugin(toJSON);

const Stage = model('stage', stageSchema);

module.exports = Stage;
