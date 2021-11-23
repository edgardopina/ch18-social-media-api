const { Schema, model } = require('mongoose'); //* import Schema ctor and model function
const dateFormat = require('../utils/dateFormat'); //* import helper for fdate formatting

//! Define User schema
const UserSchema = new Schema(
   {
      username: {
         type: String,
         unique: true,
         required: 'Error: empty user name.',
         trim: true,
      },
      email: {
         type: String,
         required: 'Error: empty email address.',
         unique: 'The email must be unique',
         //! TODO: add email validation
         match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
      },
      createdAt: {
         type: Date,
         default: Date.now(),
         get: createdAtVal => dateFormat(createdAtVal), //* getter; each time we retrieve createdAt, it will be formatted by dateFormat()
      },
      //* sub-document
      thoughts: [
         {
            type: Schema.Types.ObjectId, //* it will be an ObjectId type
            ref: 'Thought', //* references the Thought model
         },
      ],
      friends: [
         {
            type: Schema.Types.ObjectId, //* it will be an ObjectId type
            ref: 'User', //* references the User model (itself)
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

//! get total count of friends on retrieval
//* takes the array friends, and calculates friends.length
UserSchema.virtual('friendCount').get(function () {
   return this.friends.length;
});

//! Create user model
const User = model('User', UserSchema);

module.exports = User; //* exports the User model
