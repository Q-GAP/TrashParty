 const router = require('express').Router();
 const userRoutes = require("./user-routes")
 const trashRoutes = require("./trash-routes")
 const userTrashRoutes = require("./usertrash-routes")
 const tradeRoutes = require('./trade-routes')
 const landfillRoutes = require('./landfill-routes')

 router.use('/users', userRoutes)
 router.use('/trash', trashRoutes)
 router.use('/usertrash', userTrashRoutes)
 router.use('/trade', tradeRoutes)
 router.use('/landfill', landfillRoutes)


 module.exports = router;