const request = require('supertest')
const DeviceLogs = require('../server/models').DeviceLogs

const {server, app} = require('../')

describe('GET /device_log', () => {

    beforeEach(async () => {
        await DeviceLogs.destroy({where: {}, truncate: true})
    })

    beforeEach(async () => {
        await DeviceLogs.bulkCreate([
            {phoneNum: '123', raw: 'somevalue', latitude: '55.7465233333', longitude: '37.9983133333', speed : '2.2430291182220397', trackAngle: '226.12', recordedAt: '2019-06-07 15:14:10.000000'},
            {phoneNum: '123', raw: 'somevalue1', latitude: '55.7465233333', longitude: '37.9983133333', speed : '2.2430291182220397', trackAngle: '226.12', recordedAt: '2019-06-07 15:14:10.000000'},
            {phoneNum: '124', raw: 'somevalue2', latitude: '55.7465233333', longitude: '37.9983133333', speed : '2.2430291182220397', trackAngle: '226.12', recordedAt: '2019-06-07 15:14:10.000000'}]
        )
    })

    afterAll(async () => {
        await server.close()
    })

    it('it should return proper phone', async () => {

        request(server).get('/api/device_log').query({'phoneNumber': '123'})
            .expect(response => {
                response.body.should.have.property('phoneNumber', '123')
                response.body.should.have.property('raw', 'somevalue1')
            })
    })
})
