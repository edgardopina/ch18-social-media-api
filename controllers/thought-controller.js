const { User, Thought } = require('../models');


const thoughtController = {
   addThought({ params, body }, res) {
      Thought.create(body)
         .then(({ _id }) => {
            return User.findOneAndUpdate({ _id: params.userId }, { $push: { thoughts: _id } }, { new: true });
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
   removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.thoughtId })
         .then(deletedThought => {
            if (!deletedThought) {
               return res.status(404).json({ message: 'No user found with this id!' });
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

   addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
         { _id: params.thoughtId }, //* find thoughtId
         { $push: { replies: body } }, //* push boidy into replies
         {
            new: true, //* return updated data
            runValidators: true, //* enable mongoose validators
         }
      )
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.json(err));
   },

   removeReaction({ params }, res) {
      Thought.findOneAndUpdate(
         { _id: params.thoughtId },
         { $pull: { replies: { replyId: params.replyId } } }, //* remove replyId from replies array
         { new: true }
      )
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.json(err));
   },

   getThoughts({ body }, res) {
      Thought.find({}).then(dbThoughtData => res.json(dbThoughtData));
   },

   deleteThoughts({ body }, res) {
      Thought.remove({}).then(dbThoughtData => res.json(dbThoughtData));
   },
};

module.exports = thoughtController;
