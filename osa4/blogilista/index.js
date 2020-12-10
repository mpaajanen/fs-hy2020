const app = require('./app')
const http = require('http')
const config = require('./utils/config')

// const express = require('express')
// const app = express()
// const cors = require('cors')
// const Blog = require('./models/blog')

// app.use(cors())
// app.use(express.json())

// const PORT = 3003

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
