const UserModel = require('../models/user.model')

module.exports.uploadProfile = async (req, res) => {
  try {
    let path = req.file.path
    let file = req.file
    console.log("Path : ", path)
    console.log("File : ", JSON.stringify(file))

    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set : {picture: "./uploads/profile/" + file.filename} },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    )
    .then(docs => res.status(201).send({ message: "File uploaded succesfully" }))
    .catch(err => res.status(400).send({ message: err }))
  }
  catch (err) {
    res.status(400).json({ err: err.message })
  }
}