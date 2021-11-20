//! this file imports all API routes to prefix their endpoint names and package them up
const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');
const commentRoutes = require('./comment-routes');


router.use('/pizzas', pizzaRoutes); // pre-fixes '/pizzas' to routes in pizzaRoutes.js
router.use('/comments', commentRoutes); // pre-fixes '/comments' to routes in commentRoutes.js


module.exports = router;
