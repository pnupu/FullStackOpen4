const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const blogRouter = require('./controller/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')
mongoose.set('useFindAndModify', false);
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')

logger.info('connecting to', config.mongoUrl)

  
mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
      .then(() => {
          console.log('connected to MongoDB')
      })
      .catch((error) => {
          console.log('error connecting to MongoDB:', error.message)
      })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app