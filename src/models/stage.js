const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const stageSchema = Schema(
  {
    parent: {
      type: SchemaTypes.ObjectId,
      ref: 'Stage',
    },
    questions: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Question',
      },
    ],
  },
  { timestamps: true }
);

stageSchema.plugin(toJSON);

const Stage = model('Stage', stageSchema);

module.exports = Stage;
