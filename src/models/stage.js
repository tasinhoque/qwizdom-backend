const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const schema = Schema(
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

schema.plugin(toJSON);

const Stage = model('Stage', schema);

module.exports = Stage;
