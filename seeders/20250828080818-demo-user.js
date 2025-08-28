'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name : 'John1',
        email: 'example@example.com',
        role : "XyZ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        name : 'John2',
        email: 'example2@example.com',
        role : "XyZ2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};

