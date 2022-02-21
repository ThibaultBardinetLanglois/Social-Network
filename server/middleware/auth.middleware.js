const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.socialNetworkMERN
  // For reading a cookie with express we need the cookie-parser 's library
  if (token) {
    jwt.verify(token, process.env.SERVER_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null
        res.clearCookie('socialNetworkMERN')
        next()
      }
      else {
        console.log("DECODED TOKEN FOR CHECK USER =>", decodedToken)
        let user = await UserModel.findById(decodedToken.id)
        res.locals.user = user
        console.log("USER =>", user)
        next()
      }
    })
  }
  else {
    res.locals.user = null
    next()
  }
}

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.socialNetworkMERN
  if (token) {
    jwt.verify(token, process.env.SERVER_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log("DECODED TOKEN.ID FOR REQUIREAUTH", decodedToken.id)
        next()
      }
    })
  }
  else {
    console.log("NO TOKEN FOUND")
  }
}