const express = require('express')
const router = express.Router()

// @route   POST api/users
// @desc    Registers a new user
// @access  Public
router.post('/', (req, res) => {
  res.send('Registers users')
})

module.exports = router