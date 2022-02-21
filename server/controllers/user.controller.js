const userModel = require('../models/user.model')
const UserModel = require('../models/user.model')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select('-password')
  res.status(200).json(users)
}

module.exports.userInfo = async (req, res) => {
  console.log(req.params)
  // If the id is not known from the db
  if (!ObjectID.isValid(req.params.id)) {
    res.status(400).send('ID unknown: ' + req.params.id)
  }

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.status(200).send(docs)
    else console.log('ID unknown: ' + err)
  }).select('-password')
}

module.exports.updateUser = async (req, res) => {
  console.log(req.params)
  // If the id is not known from the db
  if (!ObjectID.isValid(req.params.id)) {
    res.status(400).json({ message: 'ID unknown: ' + req.params.id})
  }

  try {
    await UserModel.findOneAndUpdate(
      {_id: req.params.id},
      {
        $set: {
          pseudo: req.body.pseudo,
          bio: req.body.bio
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true},
    )
    .then((docs) => res.status(200).send(docs))
    .catch((err) => res.status(500).send({message: err}))
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

module.exports.deleteUser = async (req, res) => {
  console.log(req.params)
  // If the id is not known from the db
  if (!ObjectID.isValid(req.params.id)) {
    res.status(400).json({ message: 'ID unknown: ' + req.params.id})
  }

  try {
    await userModel.deleteOne({ _id: req.params.id}).exec()
    .then((docs) => res.status(200).json({ message: "User deleted succesfully!" }))
    .catch((err) => res.status(500).send({message: err}))
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// FOLLOW AND UNFOLLOW

module.exports.follow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)) {
    res.status(400).json({ message: 'ID unknown: ' + req.params.id})
  }

  try {
    // add to the followers list
    await UserModel.findByIdAndUpdate(
      // the id of the person who wants to follow another
      req.params.id,
      // the person's id who is followed
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    )
    .then((docs) => res.status(201).json({ docs }))
    .catch((err) => res.status(400).json({message: err}))

    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id }},
      { new: true, upsert: true }
    )
    .then((docs) => console.log("Now the user: ", req.params.id, " is following the user: ", req.body.idToFollow))
    .catch((err) => console.log(err))
  } catch {
    res.status(500).json({ message: err })
  }
}

module.exports.unfollow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow)) {
    res.status(400).json({ message: 'ID unknown: ' + req.params.id})
  }

  try {
    // add to the followers list
    await UserModel.findByIdAndUpdate(
      // the id of the person who wants to follow another
      req.params.id,
      // the person's id who is followed
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
    )
    .then((docs) => res.status(201).json({ docs }))
    .catch((err) => res.status(400).json({message: err}))

    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id }},
      { new: true, upsert: true }
    )
    .then((docs) => console.log("Now the user: ", req.params.id, " isn't followed by the user: ", req.body.idToUnfollow, " anymore"))
    .catch((err) => console.log(err))
  } catch {
    res.status(500).json({ message: err })
  }
}

