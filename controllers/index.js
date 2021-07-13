const router = require('express').Router();

const apiRoutes = require('./api');
// DEFINE MORE ROUTES

router.use('/api', apiRoutes);
// ADD MORE ROUTES

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;