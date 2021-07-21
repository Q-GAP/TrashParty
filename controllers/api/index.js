 const router = require('express').Router();
 const userRoutes = require("./user-routes")
 const trashRoutes = require("./trash-routes")
 const userTrashRoutes = require("./usertrash-routes")
 const packRoutes = require('./pack-routes')

 router.use('/users', userRoutes)
 router.use('/trash', trashRoutes)
 router.use('/usertrash', userTrashRoutes)
 router.use('/pack', packRoutes)


 module.exports = router;