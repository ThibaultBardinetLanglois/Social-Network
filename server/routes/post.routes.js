const router = require('express').Router()
const postController = require('../controllers/post.controller')
const multerPostMiddleware = require('../middleware/multer.post.middleware')

router.get('/', postController.getAll)

// CRUD
router.get('/:id', postController.readPost)
router.post('/', multerPostMiddleware, postController.createPost)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)

// for modify an element in an array inside an element we use the patch method
router.patch('/like-post/:id', postController.likePost)
router.patch('/unlike-post/:id', postController.unlikePost)

// comments
router.patch('/comment-post/:id', postController.commentPost)
router.patch('/edit-comment-post/:id', postController.editCommentPost)
router.patch('/delete-comment-post/:id', postController.deleteCommentPost)

module.exports = router