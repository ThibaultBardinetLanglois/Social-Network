const mongoose = require('mongoose')
var { isEmail } = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 10
    },
    picture: {
      type: String,
      default: ""
    },
    bio:{
      type: String,
      max: 1024,
      default: ""
    },
    followers: {
      type: [String]
    },
    following: {
      type: [String]
    },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: true,
  }
)

// play function before save into save into db
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// verify the login appel
userSchema.statics.login = async function(email, password) {
  console.log("login")
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('Incorrect password')
  }
  throw Error('Incorrect email')
}

const userModel = mongoose.model("user", userSchema)

module.exports = userModel