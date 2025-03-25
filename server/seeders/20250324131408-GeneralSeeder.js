'use strict';
const { hashingPassword } = require('../helpers/bcrypt')

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

    // create user admin
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@example.com',
        password: await hashingPassword('12345678'),
        role: 'Admin',
        emailVerifiedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])

    // create course
    await queryInterface.bulkInsert('Courses', [
      {
        title: 'Hiragana with Ryu Sensei',
        desc: 'Join our comprehensive course to master Hiragana, the foundation of the Japanese writing system, with expert guidance from Ryu Sensei.',
        sensei: 'Ryu Sensei',
        imageUrl: 'https://i.ytimg.com/vi/nrv_iMuMLFk/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBFRz9nFqgGVX23V3mvxtb_PwzVMg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])

    // create materials
    await queryInterface.bulkInsert('Materials', [
      {
        title: 'Belajar Bahasa Jepang - CARA HAFAL HIRAGANA',
        desc: 'こんにちは !! Hari ini mari kita belajar membaca Hiragana sampai bisa ya. Buat teman2 yg mau belajar materi lainnya silahkan cek playlist yaa Arigatou Minasan (^^)',
        imageUrl: 'https://i.ytimg.com/vi/nrv_iMuMLFk/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBFRz9nFqgGVX23V3mvxtb_PwzVMg',
        duration: '00:39:23',
        CourseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Belajar Bahasa Jepang - CARA MENULIS HIRAGANA',
        desc: 'こんにちは !! Hari ini mari kita belajar menulis Hiragana sampai bisa ya. Buat teman2 yg mau belajar materi lainnya silahkan cek playlist yaa Arigatou Minasan (^^)',
        imageUrl: 'https://i.ytimg.com/vi/6FTwPcS-nYY/hqdefault.jpghttps://i.ytimg.com/vi/6FTwPcS-nYY/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLB9onB03gXT_ttr9_g4X1LfYxpS_A',
        duration: '00:11:57',
        CourseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
