const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config({path: './config/.env'})
require('./config/db')
const { checkUser, requireAuth } = require('./middleware/auth.middleware')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(__dirname + '/public'));

// we use cors module to authorize external request to our server, from the front for example
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

const userRoutes = require('./routes/user.routes.js')
const postRoutes = require('./routes/post.routes')


// jwt
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/user', userRoutes)
app.use('/api/posts', postRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})