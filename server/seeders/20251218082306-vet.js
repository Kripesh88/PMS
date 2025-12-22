'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Vets',
    [
  {
    id: 1,
    name: "Dr. Anil Sharma",
    specialization: "Small Animal Practice",
    experienceYears: 8,
    rating: 4.5,
    status: "Available",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Dr. Suman Karki",
    specialization: "Large Animal Practice",
    experienceYears: 12,
    rating: 4.7,
    status: "Busy",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Dr. Ramesh Adhikari",
    specialization: "Veterinary Surgery",
    experienceYears: 10,
    rating: 4.6,
    status: "Available",
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Dr. Nisha Thapa",
    specialization: "Veterinary Dermatology",
    experienceYears: 6,
    rating: 4.3,
    status: "Available",
    createdAt: new Date(),
  },
  {
    id: 5,
    name: "Dr. Prakash Bhandari",
    specialization: "Veterinary Orthopedics",
    experienceYears: 15,
    rating: 4.8,
    status: "Busy",
    createdAt: new Date(),
  },
  {
    id: 6,
    name: "Dr. Aayush Pandey",
    specialization: "Emergency & Critical Care (Veterinary)",
    experienceYears: 7,
    rating: 4.4,
    status: "Available",
    createdAt: new Date(),
  },
  {
    id: 7,
    name: "Dr. Kriti Joshi",
    specialization: "Animal Nutrition & Dietetics",
    experienceYears: 9,
    rating: 4.5,
    status: "Busy",
    createdAt: new Date(),
  },
  {
    id: 8,
    name: "Dr. Sanjay Rana",
    specialization: "Veterinary Internal Medicine",
    experienceYears: 11,
    rating: 4.6,
    status: "Available",
    createdAt: new Date(),
  },
  {
    id: 9,
    name: "Dr. Pooja Gurung",
    specialization: "Veterinary Radiology",
    experienceYears: 5,
    rating: 4.2,
    status: "Available",
    createdAt: new Date(),
  },
  {
    id: 10,
    name: "Dr. Bikash Shrestha",
    specialization: "Preventive & Community Veterinary Care",
    experienceYears: 13,
    rating: 4.7,
    status: "Busy",
    createdAt: new Date(),
  }
],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Vets',null,{});
  }
};
