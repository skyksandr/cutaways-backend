module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('DeviceLogs', 'phoneNum',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '-1'
        });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('DeviceLogs', 'phoneNum');
  }
};
