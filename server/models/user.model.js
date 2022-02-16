const mongoose = require('mongoose')
var { isEmail } = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
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
      minlength: 6
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png"
    },
    bio :{
      type: String,
      max: 1024,
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

const userModel = mongoose.model("user", userSchema)

module.exports = userModel