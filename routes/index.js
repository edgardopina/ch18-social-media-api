const router = require('express').Router();
const apiRoutes = require('./api');


//! all requests coming through the '/api' route will processed by the routes in apiRoutes
router.use('/api', apiRoutes); 

//* captures all undefined routes
router.use((req, res) => {
   res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
