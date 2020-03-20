const DeviceLogs = require('../models').DeviceLogs
const PayloadParser = require('../services/payloadParser')

module.exports = {
  list(req, res) {
    return DeviceLogs
      .all()
      .then(logs => res.status(200).send(logs))
      .catch(error => res.status(400).send(error))
  },

  create(req, res) {
    const payload = new PayloadParser(req.body)
    const data = {
      latitude: payload.latitude,
      longitude: payload.longitude,
      speed: payload.speed,
      trackAngle: payload.trackAngle,
      recordedAt: payload.recordedAt,
      raw: JSON.stringify(payload.data),
    }

    DeviceLogs
     .create(data)
     .then(record => res.status(200).send({ status: 'OK' }))
  }
}
