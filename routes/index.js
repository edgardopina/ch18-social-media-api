const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./html/html-routes');


router.use('/api', apiRoutes);// pre-fixes '/api' to all routes in '/api' directory 
router.use('/', htmlRoutes);  // pre-fixes '/' to routes in html-routes.js

// captures all undefined routes
router.use((req, res) => {
   res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
