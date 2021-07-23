const router = require('express').Router();

const apiRoutes = require('./api');

const mainRoutes = require('./mainRoutes');
    // DEFINE MORE ROUTES

router.use('/api', apiRoutes);
router.use('/', mainRoutes);
// ADD MORE ROUTES


router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;