// DATA FORMAT
//
// RMC - NMEA has its own version of essential gps pvt (position, velocity, time) data. It is called RMC, The Recommended Minimum, which will look similar to:
//
// $GPRMC,123519,A,4807.038,N,01131.000,E,022.4,084.4,230394,003.1,W*6A
//
// Where:
//      RMC          Recommended Minimum sentence C
//      123519       Fix taken at 12:35:19 UTC
//      A            Status A=active or V=Void.
//      4807.038,N   Latitude 48 deg 07.038' N
//      01131.000,E  Longitude 11 deg 31.000' E
//      022.4        Speed over the ground in knots
//      084.4        Track angle in degrees True
//      230394       Date - 23rd of March 1994
//      003.1,W      Magnetic Variation
//      *6A          The checksum data, always begins with *

const KNOTS_IN_MS = 1.9438

module.exports = class PayloadParser {
  constructor(data) {
    this.data = data
  }

  get latitude() {
    const degrees = Number(this.nmea[3].substring(0, 2))
    const seconds = Number(this.nmea[3].substring(2))
    const negate = this.nmea[4].toUpperCase() === 'S'

    return (degrees + seconds / 60) * (negate ? -1 : 1)
  }

  get longitude() {
    const degrees = Number(this.nmea[5].substring(0, 3))
    const seconds = Number(this.nmea[5].substring(3))

    return degrees + seconds / 60
  }

  get trackAngle() {
    return Number(this.nmea[8])
  }

  get speed() {
    return Number(this.nmea[7]) / KNOTS_IN_MS
  }

  get recordedAt() {
    const timePart = this.nmea[1]
    const time = `${timePart.substring(0, 2)}:${timePart.substring(2, 4)}:${timePart.substring(4,6)}`

    const datePart = this.nmea[9]
    const date = `20${datePart.substring(4, 6)}-${datePart.substring(2, 4)}-${datePart.substring(0, 2)}`

    return Date.parse(`${date}T${time}`)
  }

  get nmea() {
    return this.data.message.split('; ').find(str => str.startsWith('$GPRMC')).split(',')
  }
}
