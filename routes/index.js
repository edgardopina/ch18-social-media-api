const router = require('express').Router();
const apiRoutes = require('./api');


router.use('/api', apiRoutes);// pre-fixes '/api' to all routes in '/api' directory 

// captures all undefined routes
router.use((req, res) => {
   res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
