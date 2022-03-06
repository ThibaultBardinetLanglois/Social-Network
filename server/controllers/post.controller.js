const PostModel = require('../models/post.model')
const UserModel = require('../models/user.model')

// In order to verify if the passed parameter exist in database
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAll = async (req, res) => {
  const post = await PostModel.find().select().sort({ createdAt: -1 })
  res.status(200).json(post)
}

module.exports.readPost = async (req, res) => {
  console.log(req.params)
  // If the id is not known from the db
  if (!ObjectID.isValid(req.params.id)) {
    res.status(400).send('ID unknown: ' + req.params.id)
  }

  PostModel.findById(req.params.id, (err, docs) => {
    if (!err) res.status(200).send(docs)
    else console.log('ID unknown: ' + err)
  }).select()
}

module.exports.createPost = async (req, res) => {
  console.log("REQ.FILE ==>", req.file)
  if (req.file != null) {
    let path = req.file.path
    let file = req.file
    console.log("Path : ", path)
    console.log("File : ", JSON.stringify(file))
    fileName = file.filename
  }

  console.log(req.body)

  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file != null ? fileName : "",
    video: req.body.video,
    likers: [],
    comments: []
  })

  try {
    const post = await newPost.save()
    res.status(201).json(post)
  }
  catch (err){
    res.status(400).send(err)
  }
}

module.exports.updatePost = (req, res) => {
  console.log(req.params)
  // If the id is not known from the db
  if (!ObjectID.isValid(req.params.id)) {
    res.status(400).json({ message: 'ID unknown: ' + req.params.id})
  }

  const updatedRecord = {
    message: req.body.message
  }

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs)
      else console.log("Update error =>", err)
    }
  )
}

module.exports.deletePost = (req, res) => {
  console.log(req.params)
  // If the id is not known from the db
  if (!ObjectID.isValid(req.params.id)) {
    res.status(400).json({ message: 'ID unknown: ' + req.params.id})
  }

  PostModel.findByIdAndRemove(
    req.params.id,
    (err, docs) => {
      if (!err) res.send(`Post ${req.params.id} deleted successfully!`)
      else console.log("DELETE ERROR =>", err)
    }
  )
}

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(400).json({ message: 'ID unknown: ' + req.params.id})
  }
  
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        // addToSet allows you to add in array
        $addToSet: { likers: req.body.id },
      },
      { new: true }
    )
    .then((docs) => console.log(docs))
    .catch((err) => console.log(err))
    
    await UserModel.findByIdAndUpdate(
      req.body.id,
      { 
        $addToSet: { likes: req.params.id } 
      },
      { new: true },
    )
    .then((docs) => res.status(201).json({ docs }))
    .catch((err) => res.status(400).json({message: err}))
  } catch(err) {
    res.status(400).send(err)
  }
}

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(400).json({ message: 'ID unknown: ' + req.params.id})
  }

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        // addToSet allows you to add in array
        $pull: { likers: req.body.id },
      },
      { new: true }
    )
    .then((docs) => console.log(docs))
    .catch((err) => console.log(err))
    
    await UserModel.findByIdAndUpdate(
      req.body.id,
      { 
        $pull: { likes: req.params.id } 
      },
      { new: true },
    )
    .then((docs) => res.status(201).json({ docs }))
    .catch((err) => res.status(400).json({message: err}))
  } catch(err) {
    res.status(400).send(err)
  }
}

module.exports.commentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(400).json({ message: 'ID unknown: ' + req.params.id})
  }

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime()
          }
        }
      },
      { new: true },
    )
    .then((docs) => res.status(201).json({ docs }))
    .catch((err) => res.status(400).json({message: err}))
  }
  catch (err) {
    res.status(400).send(err)
  }
}

module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(400).json({ message: 'ID unknown: ' + req.params.id})
  }
  console.log(req.body)
  try {
    return PostModel.findById(
      req.params.id,
       (err, docs) => {
        const theComment = docs.comments.find((comment) => 
          comment._id.equals(req.body.commentId)
        )
        console.log('The Comment ===> ', theComment)
        if (!theComment) res.status(404).send('Comment not found')
        theComment.text = req.body.text
        
        return docs.save((err) => {
          if (!err) return res.status(200).send(docs)
          return res.status(500).send(err)
        })
      }
    )
  }
  catch (err) {
    res.status(400).send(err)
  }
}

module.exports.deleteCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(400).json({ message: 'ID unknown: ' + req.params.id})
  }

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId
          }
        }
      },
      { new: true },
      // (err, docs) => {
      //   if (!err) res.status(200).send(docs)
      //   else return res.status(400).send(err)
      // }
    )
    .then((docs) => res.status(200).send(docs))
    .catch((err) => res.status(500).send({message: err}))
  }
  catch {
    res.status(400).send(err)
  }
}