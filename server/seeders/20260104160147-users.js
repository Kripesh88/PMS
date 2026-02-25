'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the default password

    await queryInterface.bulkInsert('Users', [
      // VETS (IDs: 101–110)
      {
        id: 101,
        name: 'Dr. Anil Sharma',
        email: 'vet1@gmail.com',
        password: hashedPassword,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 102,
        name: 'Dr. Suman Karki',
        email: 'vet2@gmail.com',
        password: hashedPassword,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 103,
        name: 'Dr. Ramesh Adhikari',
        email: 'vet3@gmail.com',
        password: hashedPassword,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 104,
        name: 'Dr. Nisha Thapa',
        email: 'vet4@gmail.com',
        password: hashedPassword,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 105,
        name: 'Dr. Prakash Bhandari',
        email: 'vet5@gmail.com',
        password: hashedPassword,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 106,
        name: 'Dr. Aayush Pandey',
        email: 'vet6@gmail.com',
        password: hashedPassword,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 107,
        name: 'Dr. Kriti Joshi',
        email: 'vet7@gmail.com',
        password: hashedPassword,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 108,
        name: 'Dr. Sanjay Rana',
        email: 'vet8@gmail.com',
        password: hashedPassword,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 109,
        name: 'Dr. Pooja Gurung',
        email: 'vet9@gmail.com',
        password: hashedPassword,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 110,
        name: 'Dr. Bikash Shrestha',
        email: 'vet10@gmail.com',
        password: hashedPassword,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // GROOMERS (IDs: 201–210)
      {
        id: 201,
        name: 'Rohan Shrestha',
        email: 'groomer1@gmail.com',
        password: hashedPassword,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 202,
        name: 'Anusha Karki',
        email: 'groomer2@gmail.com',
        password: hashedPassword,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 203,
        name: 'Bikram Adhikari',
        email: 'groomer3@gmail.com',
        password: hashedPassword,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 204,
        name: 'Sujata Thapa',
        email: 'groomer4@gmail.com',
        password: hashedPassword,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 205,
        name: 'Nabin Bhandari',
        email: 'groomer5@gmail.com',
        password: hashedPassword,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 206,
        name: 'Kritika Gurung',
        email: 'groomer6@gmail.com',
        password: hashedPassword,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 207,
        name: 'Sagar Rana',
        email: 'groomer7@gmail.com',
        password: hashedPassword,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 208,
        name: 'Pooja Joshi',
        email: 'groomer8@gmail.com',
        password: hashedPassword,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 209,
        name: 'Amit Pandey',
        email: 'groomer9@gmail.com',
        password: hashedPassword,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 210,
        name: 'Sandhya Shrestha',
        email: 'groomer10@gmail.com',
        password: hashedPassword,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      id: { [Sequelize.Op.between]: [101, 110] }, // vets
    });

    await queryInterface.bulkDelete('Users', {
      id: { [Sequelize.Op.between]: [201, 210] }, // groomers
    });
  },
};
