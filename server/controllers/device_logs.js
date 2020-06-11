const DeviceLogs = require('../models').DeviceLogs
const PayloadParser = require('../services/payloadParser')

module.exports = {
  list(req, res) {
    return DeviceLogs
      .all()
      .then(logs => res.status(200).send(logs))
      .catch(error => res.status(400).send(error))
  },

  getLast(req, res){
    const phoneNumber = req.query.phoneNumber
    DeviceLogs.findOne({
      where: {
        phoneNum: phoneNumber
      },
      order: [['id', 'DESC']]
    })
        .then(log => {
          res.status(200).send(log)
        })
        .catch(error => {
          res.status(400).send(error)
        })
  },

  create(req, res) {
    const payload = new PayloadParser(req.body)
    const data = {
      phoneNum: payload.phoneNumber,
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
