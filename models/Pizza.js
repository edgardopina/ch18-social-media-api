const { Schema, model } = require('mongoose'); //* import Schema ctor and model function
const dateFormat = require('../utils/dateFormat');

//! create Pizza schema
const PizzaSchema = new Schema(
   {
      pizzaName: {
         type: String,
         // required: true,
         required: 'You need to provide a pizza name!',
         trim: true,
      },
      createdBy: {
         type: String,
         // required: true,
         required: 'You need to provide a created by name!',
         trim: true,
      },
      createdAt: {
         type: Date,
         default: Date.now(),
         //* define getter; each time we retrieve createdAt, it will be formatted by dateFormat()
         get: createdAtVal => dateFormat(createdAtVal),
      },
      size: {
         type: String,
         required: true,
         enum: ['Personal','Small','Medium','Large','Extra Large'],
         default: 'Large'
      },
      toppings: [],
      comments: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
         },
      ],
   },
   {
      toJSON: {
         virtuals: true, //* enable mongoose virtuals for this schema
         getters: true, //* enable mongoose getters for this schema
      },
      id: false, //* mongoose virtuals do not need id
   }
);

//! get total count of comments and replies on retrieval
//* takes the array comments, and for each element of comments (starting at index 0 - .reduce()'s second
//* argument), calculates replies.length + 1 parent comment and accummulates in total. Returns total
PizzaSchema.virtual('commentCount').get(function () {
   return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

//! create Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza; // exports the Pizza model
