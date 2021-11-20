//! file to set up express Comment router
const router = require('express').Router();

//! import comment-controller functionality and destructure comment-controller into method names
const {
   addComment,
   removeComment,
   addReply,
   removeReply,
   getComments,
   deleteComments,
} = require('../../controllers/comment-controller');

router
   .route('/:pizzaId')
   //* controller methods for this route
   .post(addComment);

router
   .route('/:pizzaId/:commentId')
   //* controller methods for this route
   .delete(removeComment)
   .put(addReply);

router
   .route('/:pizzaId/:commentId/:replyId')
   //* controller methods for this route
   .delete(removeReply);

router
   .route('/')
   //* get all comments
   .get(getComments)
   .delete(deleteComments);


module.exports = router;
