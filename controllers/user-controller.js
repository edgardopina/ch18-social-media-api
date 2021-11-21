const { User } = require('../models');


const userController = {
   //! GET ALL users - METHOD
   getAllUsers(req, res) {
      User.find({})
         //* populate() enables referencing documents' data in other collections
         .populate({
            path: 'thoughts', //* collection to populate from
            select: '-__v', //* sellect all fields except ('-') __v from 'thoughts'
         })
         .select('-__v') //* sellect all fields except ('-') __v from 'user'
         .sort({ _id: -1 }) //*sorts descending(-1) by '_id'
         .then(dbUserData => res.json(dbUserData))
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   
   //! GET ONE user by id - METHOD
   //* NOTE that we destructured params from req instead of passsing all req
   getUserById({ params }, res) {
      User.findOne({ _id: params.id })
         .populate({
            path: 'thoughts', //* collection to populate from
            select: '-__v', //* select all fields except __v
         })
         .select('-__v')
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
         });
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
   updateUser({ params, body }, res) {
      User.findOneAndUpdate(
         { _id: params.id },
         body,
         {
            new: true,//* return the updated version of the document
            runValidators: true, //* enable mongoose runValidators for this schema
         } 
         //* the MongoDB and Mongoose methods .updateOne() and .updateMany(), update the doc without returning it
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

   
   //! DELETE ONE user by id - METHOD
   deleteUser({ params }, res) {
      //* findOneAndDelete() returns more data than .deleteOne() and .deleteMany() methods
      User.findOneAndDelete({ _id: params.id })
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   
   //! DELETE ALL users - METHOD
   deleteALLUser({ body }, res) {
      User.remove({}).then(dbThoughtData => res.json(dbThoughtData));
   },
};

module.exports = userController;
