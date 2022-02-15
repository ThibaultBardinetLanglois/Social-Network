const express = require('express')
const app = express()

const dotenv = require('dotenv')

app.listen(5000, () => {
  console.log('Listening on port 5000')
})