const request = require('supertest')
const { expect, test, afterAll, describe } = require('@jest/globals')
const app = require('../app')
const { Course, User, Material } = require('../models/index')
const { signToken } = require('../helpers/jwt')
const { hashingPassword } = require('../helpers/bcrypt')

beforeAll(async () => {
    const user = await User.create({
        email: 'testuser@example.com',
        password: await hashingPassword('password123'),
        emailVerifiedAt: new Date()
    })

    await Course.create(
        {
            title: 'Hiragana bersama Ryu Sensei',
            desc: 'Bergabunglah dengan kursus komprehensif kami untuk menguasai Hiragana, dasar dari sistem penulisan Jepang, dengan bimbingan ahli dari Ryu Sensei.',
            sensei: 'Ryu Sensei',
            imageUrl: 'https://i.ytimg.com/vi/nrv_iMuMLFk/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBFRz9nFqgGVX23V3mvxtb_PwzVMg',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    )

    await Material.create(
        {
            title: 'Belajar Bahasa Jepang - CARA HAFAL HIRAGANA',
            desc: 'こんにちは !! Hari ini mari kita belajar membaca Hiragana sampai bisa ya. Buat teman2 yg mau belajar materi lainnya silahkan cek playlist yaa Arigatou Minasan (^^)',
            imageUrl: 'https://i.ytimg.com/vi/nrv_iMuMLFk/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBFRz9nFqgGVX23V3mvxtb_PwzVMg',
            videoUrl: 'https://www.youtube.com/watch?v=nrv_iMuMLFk&list=PLhQ568NlkEK2O3NhQdNzl9YNLEgXMSW-J&index=1',
            duration: '00:39:23',
            CourseId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    )

    accessToken = signToken({ id: user.id, email: user.email })
})

afterAll(async () => {
    await User.destroy({
        truncate: true, // hapus semua
        cascade: true, // hapus data yang berelasi
        restartIdentity: true // restart id dari 1
    })
    await Course.destroy({
        truncate: true, // hapus semua
        cascade: true, // hapus data yang berelasi
        restartIdentity: true // restart id dari 1
    })

    await Material.destroy({
        truncate: true, // hapus semua
        cascade: true, // hapus data yang berelasi
        restartIdentity: true // restart id dari 1
    })
})

// buat testing untuk GET /courses/:courseId/materials
describe('GET /courses/:courseId/materials', () => {
    test('should return a list of materials', async () => {
        const response = await request(app)
            .get('/courses/1/materials')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)

        expect(response.body.data).toBeInstanceOf(Array)
    })
})