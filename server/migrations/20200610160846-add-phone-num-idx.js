'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addIndex('DeviceLogs', ['phoneNum'],
            {
                indexName: 'phoneNumIdx'
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeIndex('DeviceLogs', 'phoneNumIdx')
    }
};
