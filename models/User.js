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
         match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
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

//! get total count of friends on retrieval
//* takes the array friends, and calculates friends.length
UserSchema.virtual('friendCount').get(function () {
   return this.friends.length;
});

//! create user model using userSchema
const User = model('User', UserSchema);

module.exports = User; // exports the User model
