'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Groomers',
      [
        {
          id: 1,
          name: 'Rohan Shrestha',
          specialization: 'Dog Grooming & Styling',
          experienceYears: 6,
          rating: 4.5,
          status: 'Available',
          createdAt: new Date(),
        },
        {
          id: 2,
          name: 'Anusha Karki',
          specialization: 'Cat Grooming & Hygiene',
          experienceYears: 5,
          rating: 4.4,
          status: 'Busy',
          createdAt: new Date(),
        },
        {
          id: 3,
          name: 'Bikram Adhikari',
          specialization: 'Breed-Specific Grooming',
          experienceYears: 8,
          rating: 4.6,
          status: 'Available',
          createdAt: new Date(),
        },
        {
          id: 4,
          name: 'Sujata Thapa',
          specialization: 'De-shedding & Coat Care',
          experienceYears: 7,
          rating: 4.3,
          status: 'Available',
          createdAt: new Date(),
        },
        {
          id: 5,
          name: 'Nabin Bhandari',
          specialization: 'Puppy Grooming',
          experienceYears: 4,
          rating: 4.1,
          status: 'Busy',
          createdAt: new Date(),
        },
        {
          id: 6,
          name: 'Kritika Gurung',
          specialization: 'Senior Pet Grooming',
          experienceYears: 9,
          rating: 4.7,
          status: 'Available',
          createdAt: new Date(),
        },
        {
          id: 7,
          name: 'Sagar Rana',
          specialization: 'Creative Grooming & Styling',
          experienceYears: 10,
          rating: 4.8,
          status: 'Busy',
          createdAt: new Date(),
        },
        {
          id: 8,
          name: 'Pooja Joshi',
          specialization: 'Medicated Bath & Skin Care',
          experienceYears: 6,
          rating: 4.4,
          status: 'Available',
          createdAt: new Date(),
        },
        {
          id: 9,
          name: 'Amit Pandey',
          specialization: 'Nail, Ear & Dental Hygiene',
          experienceYears: 5,
          rating: 4.2,
          status: 'Available',
          createdAt: new Date(),
        },
        {
          id: 10,
          name: 'Sandhya Shrestha',
          specialization: 'Show Grooming',
          experienceYears: 11,
          rating: 4.9,
          status: 'Busy',
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Groomers', null, {});
  },
};
