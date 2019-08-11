const express = require('express')
const router = express.Router()

// @route   GET api/contacts
// @desc    Get user's contacts
// @access  Private
router.get('/', (req, res) => {
  res.send('Gets contacts')
})

// @route   POST api/contacts
// @desc    Adds new contact
// @access  Public
router.post('/', (req, res) => {
  res.send('Adds contact')
})

// @route   PUT api/contacts/:id
// @desc    Updates existing contact
// @access  Public
router.put('/:id', (req, res) => {
  res.send('Changes contact')
})

// @route   DELETE api/contacts/:id
// @desc    Removes specific contact
// @access  Public
router.delete('/:id', (req, res) => {
  res.send('Removes contact')
})

module.exports = router