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
        title: 'Hiragana bersama Ryu Sensei',
        desc: 'Bergabunglah dengan kursus komprehensif kami untuk menguasai Hiragana, dasar dari sistem penulisan Jepang, dengan bimbingan ahli dari Ryu Sensei.',
        sensei: 'Ryu Sensei',
        imageUrl: 'https://i.ytimg.com/vi/nrv_iMuMLFk/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBFRz9nFqgGVX23V3mvxtb_PwzVMg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Katakana bersama Ryu Sensei',
        desc: 'Bergabunglah dengan kursus komprehensif kami untuk menguasai Katakana, dasar dari sistem penulisan Jepang, dengan bimbingan ahli dari Ryu Sensei.',
        sensei: 'Ryu Sensei',
        imageUrl: 'https://i.ytimg.com/vi/RZG9IjuF1zg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDLKvDIdRbiyESTW6raVzheADt8Hg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pola Kalimat JLPT N3 bersama Nassu Sensei',
        desc: 'Bergabunglah dengan kursus komprehensif kami untuk menguasai pola kalimat JLPT N3 bersama Nassu Sensei',
        sensei: 'Nassu Sensei',
        imageUrl: 'https://i.ytimg.com/vi/H1GylMIjSco/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBUKIutrzOpJbIy19mULVGDhbSNbA',
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
        videoUrl: 'https://www.youtube.com/watch?v=nrv_iMuMLFk&list=PLhQ568NlkEK2O3NhQdNzl9YNLEgXMSW-J&index=1',
        duration: '00:39:23',
        CourseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Belajar Bahasa Jepang - CARA MENULIS HIRAGANA',
        desc: 'こんにちは !! Hari ini mari kita belajar menulis Hiragana sampai bisa ya. Buat teman2 yg mau belajar materi lainnya silahkan cek playlist yaa Arigatou Minasan (^^)',
        imageUrl: 'https://i.ytimg.com/vi/6FTwPcS-nYY/hqdefault.jpghttps://i.ytimg.com/vi/6FTwPcS-nYY/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLB9onB03gXT_ttr9_g4X1LfYxpS_A',
        videoUrl: 'https://www.youtube.com/watch?v=6FTwPcS-nYY&list=PLhQ568NlkEK2O3NhQdNzl9YNLEgXMSW-J&index=2',
        duration: '00:11:57',
        CourseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Belajar Bahasa Jepang - CARA HAFAL KATAKANA',
        desc: 'こんにちは !! Hari ini mari kita belajar membaca Katakana sampai bisa ya. Buat teman2 yg mau belajar materi lainnya silahkan cek playlist yaa Arigatou Minasan (^^)',
        imageUrl: 'https://i.ytimg.com/vi/RZG9IjuF1zg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDLKvDIdRbiyESTW6raVzheADt8Hg',
        videoUrl: 'https://www.youtube.com/watch?v=RZG9IjuF1zg',
        duration: '00:45:12',
        CourseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Belajar Bahasa Jepang - POLA KALIMAT JLPT N3 PART 1',
        desc: 'こんにちは !! Hari ini mari kita belajar pola kalimat JLPT N3 bersama Nassu Sensei. Buat teman2 yg mau belajar materi lainnya silahkan cek playlist yaa Arigatou Minasan (^^)',
        imageUrl: 'https://i.ytimg.com/vi/H1GylMIjSco/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBUKIutrzOpJbIy19mULVGDhbSNbA',
        videoUrl: 'https://www.youtube.com/watch?v=H1GylMIjSco',
        duration: '00:50:45',
        CourseId: 3,
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
