//! file to set up express Thought router
const router = require('express').Router();

//* import thought-controller functionality and destructure thought-controller into method names
const {
   getAllThoughts,
   removeAllThoughts,
   addThought,
   removeThoughtFromUser,
   getThoughtById,
   updateThoughtById,
   removeThoughtById,
   addReaction,
   removeReactionFromThought,
} = require('../../controllers/thought-controller');

router //* process requests to /api/thoughts route
   .route('/')
   .get(getAllThoughts)
   .delete(removeAllThoughts);

router //* process requests to /api/thoughts/:userId route
   .route('/:userId')
   .post(addThought); 

router //* process requests to /api/thoughts/:userId/:thoughtId route
   .route('/:userId/:thoughtId')
   .delete(removeThoughtFromUser);

router //* process requests to /api/thoughts/:thoughtId route
   .route('/:thoughtId') 
   .get(getThoughtById)
   .put(updateThoughtById)
   .delete(removeThoughtById);

router //* process requests to /api/thoughts/:thoughtId/reactions route
   .route('/:thoughtId/reactions')
   .put(addReaction);
// .get(getAllReactionsFromThought);

router //* process requests to /api/thoughts/:thoughtId/reactions/:reactionId route
   .route('/:thoughtId/reactions/:reactionId')
   .delete(removeReactionFromThought);

module.exports = router;
