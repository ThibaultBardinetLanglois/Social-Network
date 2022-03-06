const UserModel = require('../models/user.model')

 // mdule to access and interact with the file system
const fs = require('fs')

module.exports.uploadProfile = async (req, res) => {
  try {
    console.log("REQ UPLOAD ===>", req.body)

    // remove last picture
    if (req.body.pictureToDelete !== "") {
      const namePictureToDelete = process.env.UPLOAD_PROFILE_PATH + req.body.pictureToDelete

      fs.unlink( namePictureToDelete, (err) => {
        if(err) {
            console.error(err)
            return
        }
        console.log("File successfully removed");
      } );
    }
    
    // update user
    let path = req.file.path
    let file = req.file
    console.log("Path : ", path)
    console.log("File : ", JSON.stringify(file))

    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set : {picture: file.filename} },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    )
    .then(docs => res.status(201).send({ message: "File uploaded succesfully" }))
    .catch(err => res.status(400).send({ message: err }))
  }
  catch (err) {
    res.status(400).json({ err: err.message })
  }
}