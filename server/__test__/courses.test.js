const request = require('supertest')
const { expect, test, afterAll, describe } = require('@jest/globals')

const app = require('../app')
const { Course, User } = require('../models/index')
const { signToken } = require('../helpers/jwt')
const { hashingPassword } = require('../helpers/bcrypt')


let accessToken

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
})

describe('GET /courses', () => {
    test('should return a list of courses', async () => {
        const response = await request(app)
            .get('/courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)

        expect(response.body.data).toBeInstanceOf(Array)
    })
})

// test for GET /courses/:id
describe('GET /courses/:id', () => {
    test('should return a course', async () => {
        const course = await Course.findByPk(1)
        const response = await request(app)
            .get(`/courses/${course.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)

        expect(response.body.data.name).toBe(course.name)
        expect(response.body.data.description).toBe(course.description)
        expect(response.body.data.price).toBe(course.price)
    })

    test('should return 404 if course not found', async () => {
        const response = await request(app)
            .get('/courses/999')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404)

        expect(response.body.message).toBe('error not found')
    })
})