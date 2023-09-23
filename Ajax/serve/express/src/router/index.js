const express = require('express')
const router = express.Router()

router.use('/', require('./user'))
router.use('/', require('./file'))

module.exports = router
