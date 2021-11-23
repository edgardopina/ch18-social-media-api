//! Thought model - controller methods

const { User, Thought } = require('../models'); //* import database models

const thoughtController = {
   //! GET all throughts - METHOD
   getAllThoughts({ body }, res) {
      Thought.find({})
         .then(dbThoughtData => res.json(dbThoughtData))
         .catch(err => res.status(404).json(err));
   },

   //! DELETE all throughts - METHOD
   removeAllThoughts({ body }, res) {
      Thought.remove({})
         .then(dbThoughtData => res.json(dbThoughtData))
         .catch(err => res.status(404).json(err));
   },

   //! CREATE ONE throught to one user - METHOD
   addThought({ params, body }, res) {
      Thought.create(body)
         .then(({ _id }) => {
            return User.findOneAndUpdate(
               { _id: params.userId }, //
               { $push: { thoughts: _id } },
               { new: true }
            );
         })
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.json(err));
   },

   //* remove thought from user
   removeThoughtFromUser({ params }, res) {
      Thought.findOneAndDelete({ _id: params.thoughtId })
         .then(deletedThought => {
            if (!deletedThought) {
               return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return User.findOneAndUpdate(
               { _id: params.userId },
               { $pull: { thoughts: params.thoughtId } },
               { new: true }
            );
         })
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.json(err));
   },

   getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.thoughtId })
         .select('-__v')
         .then(dbThoughtData => {
            if (!dbThoughtData) {
               res.status(404).json({ message: 'No thought found with this id!' });
               return;
            }
            res.json(dbThoughtData);
         })
         .catch(err => res.status(400).json(err));
   },

   updateThoughtById({ body, params }, res) {
      Thought.findOneAndUpdate(
         { _id: params.thoughtId }, //
         body,
         {
            new: true, //* return the updated version of the document
            runValidators: true, //* enable mongoose runValidators for this schema
         }
      )
         .then(dbThoughtData => {
            if (!dbThoughtData) {
               return res.status(404).json({ message: "No 'Thought' found with this id." });
            }
            res.json(dbThoughtData);
         })
         .catch(err => res.json(err));
   },

   removeThoughtById({ params }, res) {
      //* findOneAndDelete() returns more data than .deleteOne() and .deleteMany() methods
      Thought.findOneAndDelete({ _id: params.thoughtId })
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No thought found with this id!' });
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err));
   },

   addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
         { _id: params.thoughtId }, //* find thoughtId
         { $push: { reactions: body } }, //* push body into reactions
         {
            new: true, //* return updated data
            runValidators: true, //* enable mongoose validators
         }
      )
         .then(dbThoughtData => {
            if (!dbThoughtData) {
               res.status(404).json({ message: 'No thought found with this id!' });
               return;
            }
            res.json(dbThoughtData);
         })
         .catch(err => res.json(err));
   },

   removeReactionFromThought({ params }, res) {
      Thought.findOneAndUpdate(
         { _id: params.thoughtId },
         { $pull: { reactions: { reactionId: params.reactionId } } }, //* remove reactionId from reactions array
         { new: true }
      )
         .then(dbThoughtData => res.json(dbThoughtData))
         .catch(err => res.json(err));
   },
};

module.exports = thoughtController;
