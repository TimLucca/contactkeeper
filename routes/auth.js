const express = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router()

const auth = require('../middleware/auth')
const User = require('../models/User')

// @route   GET api/auth
// @desc    Gets logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } 
  catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', 
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password').exists()
  ], 
  async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body

    try {
      let user = await User.findOne({email})

      if(!user){
        return res.status(400).json({msg: "Email not linked to an account"})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch){
        return res.status(400).json({msg: "Password incorrect"})
      }

      const payload = {
        user: {id: user.id}
      }

      jwt.sign(payload, config.get('jwtSecret'), {
          expiresIn: 3600
        }, (err, token) => {
          if(err) throw err
          res.json({token})
      })

    } 
    catch (e) {
      console.error(e.message)
      res.status(500).send("Server Error")
    }
  }
)

module.exports = router