const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, process.env.UPLOAD_POSTS_PATH)
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_')
    const newName = name.split('.').slice(0, -1)
    const extension = MIME_TYPES[file.mimetype]
    callback(null, newName + Date.now() + '.' + extension)
  }
})

module.exports = multer({
  storage: storage,
  limits: { fileSize: 600000 },
  fileFilter: (req, file, cb) => {
    console.log("FILE ======>", parseInt(req.headers['content-length']))
    const formats = ["image/png", "image/jpg", "image/jpeg"]
    if (formats.includes(file.mimetype)) 
      cb(null, true)
    else return cb(new Error('Invalid mime type, the extension \'s file must be png, jpg or jpeg'))
    
    const fileSize = parseInt(req.headers['content-length'])
    if (fileSize <= 600000) 
      cb(null, true)
    else return cb(new Error('Invalid size, the must be less or equal than 600 ko'))
  }
}).single('file')