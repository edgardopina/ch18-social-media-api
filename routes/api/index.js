//! this file imports all API routes to prefix their endpoint names and package them up
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');


//* all requests coming through the '/api/users' route will processed by the routes in user-routes
//* all requests coming through the '/api/thoughts' route will processed by the routes in thought-routes
router.use('/users', userRoutes); 
router.use('/thoughts', thoughtRoutes); 

module.exports = router;
