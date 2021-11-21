//! this file imports all API routes to prefix their endpoint names and package them up
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/users', userRoutes); // pre-fixes '/users' to routes in userRoutes.js
router.use('/thoughts', thoughtRoutes); // pre-fixes '/toughts' to routes in toughtRoutes.js

module.exports = router;
