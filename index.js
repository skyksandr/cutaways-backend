const http = require('http')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

const deviceLogsController = require('./server/controllers').deviceLogs

const app = express()

app.use(logger('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/*+json' }))


if (process.env.NODE_ENV !== 'production') {
  app.use(errorhandler({ log: true }))
}

app.get('/api/device_logs', deviceLogsController.list)
app.get('/api/device_log', deviceLogsController.getLast)
app.post('/push.do',  deviceLogsController.create)

const port = parseInt(process.env.PORT, 10) || 8000
const server = app.listen(port)

module.exports = {
  server,
  app
}
