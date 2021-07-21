const router = require('express').Router();

const apiRoutes = require('./api');

const mainRoutes = require('./mainRoutes');
const landfillRoutes = require('./landfillRoutes')
    // DEFINE MORE ROUTES

router.use('/api', apiRoutes);
router.use('/', mainRoutes);
router.use('/landfill', landfillRoutes);
// ADD MORE ROUTES


router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;