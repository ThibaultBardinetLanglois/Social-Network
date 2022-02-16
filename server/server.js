const express = require('express')
const app = express()

const bodyParser = require('body-parser')

require('dotenv').config({path: './config/.env'})
require('./config/db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const userRoutes = require('./routes/user.routes.js')


//routes
app.use('/api/user', userRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})