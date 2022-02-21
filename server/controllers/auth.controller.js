const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { signUpErrors, signInErrors } = require('../utils/errors.utils')

const maxAge = 3 * 24 * 60 * 60 * 1000
const createToken = (id) => {
  return jwt.sign({id}, process.env.SERVER_SECRET, {
    expiresIn: maxAge
  })
}

module.exports.signUp = async (req, res) => {
  console.log('REQ BODY USER REGISTER => ',req.body)
  const { pseudo, email, password } = req.body

  try {
    const user = await UserModel.create({ pseudo, email, password })
    res.status(201).json({ user: user._id})
  }
  catch(err) {
    const errors = signUpErrors(err)
    res.status(500).json({ errors })
  }
}

module.exports.signIn = async (req, res) => {
  console.log('REQ BODY USER REGISTER => ',req.body)
  const { email, password } = req.body
  try {
    await UserModel.login(email, password)
    .then(user => {
      const token = createToken(user._id)
      res.cookie('socialNetworkMERN', token, { httpOnly: true, maxAge: maxAge })
      res.status(200).json({ user: user._id })
    })
    
  }
  catch (err) {
    const errors = signInErrors(err)
    res.status(500).json({ errors })
  }
}

module.exports.logout = async (req, res) => {
  res.clearCookie('socialNetworkMERN')
  res.json({ message: "You have been disconnected" }).end()
}