const { Schema, model } = require('mongoose'); //* import Schema ctor and model function
const dateFormat = require('../utils/dateFormat');

//! create User schema
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
         unique: true,
         // TODO: add email validation
      },
      createdAt: {
         type: Date,
         default: Date.now(),
         //* define getter; each time we retrieve createdAt, it will be formatted by dateFormat()
         get: createdAtVal => dateFormat(createdAtVal),
      },
   
          thoughts: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
         },
      ],
      friends: [
         {
            type: Schema.Types.ObjectId,
            ref: 'User',
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
UserSchema.virtual('friendCount').get(function () {
   return this.friends.reduce((total, friend) => total + friend.replies.length + 1, 0);
});

//! create user model using userSchema
const User = model('User', UserSchema);

module.exports = User; // exports the User model
