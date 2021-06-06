const { Schema, model, SchemaTypes } = require('mongoose');

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

const Stage = model('Stage', schema);

module.exports = Stage;
