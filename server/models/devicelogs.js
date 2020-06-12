'use strict';
module.exports = (sequelize, DataTypes) => {
  const DeviceLogs = sequelize.define('DeviceLogs', {
    phoneNum: DataTypes.STRING,
    latitude: DataTypes.DECIMAL(15, 10),
    longitude: DataTypes.DECIMAL(15, 10),
    speed: DataTypes.DECIMAL,
    trackAngle: DataTypes.DECIMAL,
    recordedAt: DataTypes.DATE,
    raw: DataTypes.STRING
  }, {});
  DeviceLogs.associate = function(models) {
    // associations can be defined here
  };
  return DeviceLogs;
};
