const { Schema, model, Types } = require('mongoose'); //* import Schema ctor and model function
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
   {
      //! set custom id to avoid confusing with parent thought's _id field
      reactionId: {
         type: Schema.Types.ObjectId,
         default: () => new Types.ObjectId(),
      },
      reactionBody: {
         type: String,
         required: 'Error: this field cannot be empty.',
         trim: true,
         maxLength: [280, 'Error: this field cannot exceed 280 characters.'],
      },
      username: {
         type: String,
         required: 'Error: this field cannot be empty.',
      },
      createdAt: {
         type: Date,
         default: Date.now(),
         get: createdAtVal => dateFormat(createdAtVal),
      },
   },
   {
      toJSON: {
         virtuals: true, //* enable mongoose virtuals for this schema
         getters: true, //* enable mongoose getters for this schema
      },
      id: false, //* mongoose virtuals do not need id
   }
);

//! create Thought schema
const ThoughtSchema = new Schema(
   {
      thoughtText: {
         type: String,
         required: 'Error: empty thought.',
         trim: true,
         minLength: [1, 'Error: this field must have at least 1 charcater.'],
         maxLength: [280, 'Error: this field cannot exceed more than 280 characters.'],
      },
      createdAt: {
         type: Date,
         default: Date.now(),
         //* define getter; each time we retrieve createdAt, it will be formatted by dateFormat()
         get: createdAtVal => dateFormat(createdAtVal),
      },
      username: {
         type: String,
         required: 'Error: username cannot be empty.',
      },
      reactions: [ReactionSchema],
   },
   {
      toJSON: {
         virtuals: true, //* enable mongoose virtuals for this schema
         getters: true, //* enable mongoose getters for this schema
      },
      id: false, //* mongoose virtuals do not need id
   }
);

//! get total count of reactions on retrieval
//* takes the array reactions, and calculates reactions.length
ThoughtSchema.virtual('reactionCount').get(function () {
   return this.reactions.length;
});

//! create Thought model using ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought; // exports the Thought model
