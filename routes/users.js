const express = require('express')
const {check, validationResult} = require('express-validator/check')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../models/User')

// @route   POST api/users
// @desc    Registers a new user
// @access  Public
router.post('/', [
  check('name', 'Please enter a name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty())
    return res.status(400).json({errors: errors.array()})

  const {name, email, password} = req.body

  try{
    let user = await User.findOne({email})
    if(user){
      return res.status(400).json({msg: 'Already in records'})
    }

    user = new User({name, email, password})

    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    res.send(`${name} has been added`)
  } 
  catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router