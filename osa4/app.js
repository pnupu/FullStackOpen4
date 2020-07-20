const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const notesRouter = require('./controller/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.mongoUrl)

  
mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
          console.log('connected to MongoDB')
      })
      .catch((error) => {
          console.log('error connecting to MongoDB:', error.message)
      })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app