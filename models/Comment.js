const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
   {
      //! set custom id to avoid confusing with parent comment's _id field
      replyId: {
         type: Schema.Types.ObjectId,
         default: () => new Types.ObjectId(),
      },
      replyBody: {
         type: String,
         required: 'You need to write a reply!',
         trim: true,
      },
      writtenBy: {
         type: String,
         required: 'You need to write your name!',
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

const CommentSchema = new Schema(
   {
      writtenBy: {
         type: String,
         required: 'You need to write your name!',
      },
      commentBody: {
         type: String,
         required: 'You need to write a comment!',
      },
      createdAt: {
         type: Date,
         default: Date.now(),
         get: createdAtVal => dateFormat(createdAtVal),
      },
      //* associates replies with comments
      //* note that replies are directly nested in comments unlike comments that were referenced
      //* by pizza
      replies: [ReplySchema],
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
CommentSchema.virtual('replyCount').get(function () {
   return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
