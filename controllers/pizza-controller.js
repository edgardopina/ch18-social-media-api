const { Pizza } = require('../models');

const pizzaController = {
   //! get ALL pizzas - METHOD
   getAllPizza(req, res) {
      Pizza.find({})
         //* populate() enables referencing documents' data in other collections
         .populate({
            path: 'comments', //* collection to populate from
            select: '-__v', //* sellect all fields except ('-') __v from 'comments'
         })
         .select('-__v') //* sellect all fields except ('-') __v from 'pizza'
         .sort({ _id: -1 }) //*sorts descending(-1) by '_id'
         .then(dbPizzaData => res.json(dbPizzaData))
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   //! get ONE pizza by id - METHOD
   //* NOTE that we destructured params from req instead of passsing all req
   getPizzaById({ params }, res) {
      Pizza.findOne({ _id: params.id })
         .populate({
            path: 'comments', //* collection to populate from
            select: '-__v', //* select all fields except __v
         })
         .select('-__v')
         .then(dbPizzaData => {
            if (!dbPizzaData) {
               res.status(404).json({ message: 'No pizza found with this id!' });
               return;
            }
            res.json(dbPizzaData);
         })
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   //! create pizza - METHOD
   //* NOTE that we destructured body from req instead of passsing all req
   //* MongoDB uses .insertOne() and .insertMany() methods
   //* Mongoose uses .create() to handle one or many inserts
   createPizza({ body }, res) {
      Pizza.create(body)
         .then(dbPizzaData => res.json(dbPizzaData))
         .catch(err => res.status(400).json({ message: 'Could not create new pizza!', err: err }));
   },

   //! update pizza by id - METHOD
   updatePizza({ params, body }, res) {
      Pizza.findOneAndUpdate(
         { _id: params.id },
         body,
         {
            new: true,//* return the updated version of the document
            runValidators: true, //* enable mongoose runValidators for this schema
         } 
         //* the MongoDB and Mongoose methods .updateOne() and .updateMany(), update the doc without returning it
      )
         .then(dbPizzaData => {
            if (!dbPizzaData) {
               res.status(404).json({ message: 'No pizza found with this id!' });
               return;
            }
            res.json(dbPizzaData);
         })
         .catch(err => res.status(400).json(err));
   },

   //! delete pizza by id - METHOD
   deletePizza({ params }, res) {
      //* findOneAndDelete() returns more data than .deleteOne() and .deleteMany() methods
      Pizza.findOneAndDelete({ _id: params.id })
         .then(dbPizzaData => {
            if (!dbPizzaData) {
               res.status(404).json({ message: 'No pizza found with this id!' });
               return;
            }
            res.json(dbPizzaData);
         })
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   deleteALLPizza({ body }, res) {
      Pizza.remove({}).then(dbCommentData => res.json(dbCommentData));
   },
};

module.exports = pizzaController;
