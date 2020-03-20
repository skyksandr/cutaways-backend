const request = require('supertest')
const DeviceLogs = require('../server/models').DeviceLogs

const { server, app } = require('../')

describe('POST /push.do', () => {
  beforeEach(async () => {
    await DeviceLogs.destroy({ where: {}, truncate: true })
  })

  afterAll(async () => {
    await server.close()
  })

  it('it should save payload', async () => {
    const payload = '{"phoneNumber":"+ 79811915683","message":"$GPRMC,210640.000,A,5554.2687,N,03723.1046,E,0.54,356.82,031218,,,A* 34,09; GSM: 250-01 18d3-3e4b,6d52,78ac,b3c5,3ea0 13;  M; Batt: 398,R\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r"}'
    //const payload = '&phoneNumber=%2B+79818609715&message=POWER MAIN!; $GPRMC,181410.000,A,5544.7914,N,03759.8988,E,4.36,226.12,070619,,,A* 00,00; GSM: 250-01 0244-618f,618c,619a,ac41,618b 33;  S; Batt: 410,M'

    const response = await request(server).post('/push.do').send(payload)

    expect(response.status).toEqual(200)

    const count = await DeviceLogs.count()
    expect(count).toEqual(1)
  })
})
