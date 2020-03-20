module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DeviceLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      latitude: {
        allowNull: false,
        type: Sequelize.DECIMAL(15, 10)
      },
      longitude: {
        allowNull: false,
        type: Sequelize.DECIMAL(15, 10)
      },
      speed: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      trackAngle: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      recordedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      raw: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DeviceLogs');
  }
};
