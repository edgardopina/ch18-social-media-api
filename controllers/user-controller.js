//! User model - controller methods

const { User, Thought } = require('../models'); //* import database models

const userController = {
   //! GET ALL users - METHOD
   getAllUsers(req, res) {
      User.find({})
         //* populate() enables referencing documents' data in other collections
         .populate({
            path: 'thoughts', //* collection to populate from
            select: '-__v', //* sellect all fields except ('-') __v from 'thoughts'
         })
         .populate({
            path: 'friends', //* collection to populate from
            select: '-__v', //* sellect all fields except ('-') __v from 'friends' (user)
         })
         .select('-__v') //* sellect all fields except ('-') __v from 'user'
         .sort({ _id: -1 }) //*sorts descending(-1) by '_id'
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.status(400).json(err));
   },

   //! GET ONE user by id - METHOD
   //* destructured params from req instead of passsing all req
   getUserById({ params }, res) {
      User.findOne({ _id: params.userId })
         .populate({ path: 'thoughts', select: '-__v' })
         .populate({ path: 'friends', select: '-__v' })
         .select('-__v')
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err));
   },

   //! POST CREATE one user - METHOD
   //* MongoDB uses .insertOne() and .insertMany() methods
   //* Mongoose uses .create() to handle one or many inserts
   createUser({ body }, res) {
      User.create(body)
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.status(400).json({ message: 'Could not create new user!', err: err }));
   },

   //! PUT UPDATE one user by id - METHOD
   updateUserById({ params, body }, res) {
      User.findOneAndUpdate(
         { _id: params.userId }, //
         body,
         {
            new: true, //* return the updated version of the document
            runValidators: true, //* enable mongoose runValidators for this schema
         }
      )
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err));
   },

   //! DELETE ONE user by id & its associated thoughts - METHOD
   deleteUserById({ params }, res) {
      User.findOne({ _id: params.userId })
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
         })
         .then(dbUserData => {
            User.findOneAndDelete({ _id: params.userId })
               .then(dbUserData => res.json(dbUserData))
               .catch(err => res.status(400).json(err));
         })
         .catch(err => res.status(400).json(err));
   },

   //! DELETE ALL users - METHOD
   deleteALLUser({ body }, res) {
      User.remove({}).then(dbUserData => res.json(dbUserData));
   },

   //! UPDATE user by adding a friend - METHOD
   addFriendToUser({ params }, res) {
      User.findOne({ _id: params.friendId })
         .then(({ _id }) => {
            if (!_id) {
               res.status(404).json({ message: 'No friend found with this id!' });
               return;
            }
            return User.findOneAndUpdate(
               { _id: params.userId }, //
               { $push: { friends: _id } },
               { new: true }
            )
               .then(dbUserData => {
                  if (!dbUserData) {
                     res.status(404).json({ message: 'No user found with this id!' });
                     return;
                  }
                  res.json(dbUserData);
               })
               .catch(err => res.json(err));
         })
         .catch(err => res.status(400).json(err));
   },

   //! UPDATE user by removing a friend from friends list - METHOD
   removeFriendFromUser({ params }, res) {
      User.findOne({ _id: params.friendId })
         .then(({ _id }) => {
            if (!_id) {
               res.status(404).json({ message: 'No friend found with this id!' });
               return;
            }
            return User.findOneAndUpdate(
               { _id: params.userId }, //
               { $pull: { friends: _id } },
               { new: true }
            )
               .then(dbUserData => {
                  if (!dbUserData) {
                     res.status(404).json({ message: 'No user found with this id!' });
                     return;
                  }
                  res.json(dbUserData);
               })
               .catch(err => res.json(err));
         })
         .catch(err => res.status(400).json(err));
   },
};

module.exports = userController;
