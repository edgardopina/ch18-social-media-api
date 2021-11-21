//! file to set up express Thought router
const router = require('express').Router();

//! import thought-controller functionality and destructure thought-controller into method names
const {
   addThought,
   removeThought,
   addReaction,
   removeReaction,
   getThoughts,
   deleteThoughts,
} = require('../../controllers/thought-controller');

router
   .route('/:userId')
   //* controller methods for this route
   .post(addThought);

router
   .route('/:userId/:thoughtId')
   //* controller methods for this route
   .delete(removeThought)
   .put(addReaction);

router
   .route('/:userId/:thoughtId/:reactionId')
   //* controller methods for this route
   .delete(removeReaction);

router
   .route('/')
   //* get all thoughts
   .get(getThoughts)
   .delete(deleteThoughts);


module.exports = router;
