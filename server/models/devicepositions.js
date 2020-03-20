module.exports = (sequelize, DataTypes) => {
  const DevicePositions = sequelize.define('DevicePositions', {
    latitude: DataTypes.DECIMAL(15, 10),
    longitude: DataTypes.DECIMAL(15, 10),
    altitude: DataTypes.DECIMAL(10, 4)
  }, {});

  DevicePositions.associate = function(models) {
    // associations can be defined here
  };

  return DevicePositions;
};
