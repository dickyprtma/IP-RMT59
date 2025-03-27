const request = require('supertest')
const { expect, test, afterAll, describe } = require('@jest/globals')
const app = require('../app')
const { Course, User, Material, UserCourse } = require('../models/index')
const { signToken } = require('../helpers/jwt')
const { hashingPassword } = require('../helpers/bcrypt')

beforeAll(async () => {
    const user = await User.create({
        email: 'testuser@example.com',
        password: await hashingPassword('password123'),
        emailVerifiedAt: new Date()
    })

    const course = await Course.create(
        {
            title: 'Hiragana bersama Ryu Sensei',
            desc: 'Bergabunglah dengan kursus komprehensif kami untuk menguasai Hiragana, dasar dari sistem penulisan Jepang, dengan bimbingan ahli dari Ryu Sensei.',
            sensei: 'Ryu Sensei',
            imageUrl: 'https://i.ytimg.com/vi/nrv_iMuMLFk/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBFRz9nFqgGVX23V3mvxtb_PwzVMg',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    )

    await UserCourse.create({
        UserId: user.id,
        CourseId: course.id
    })

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

    await UserCourse.destroy({
        truncate: true, // hapus semua
        cascade: true, // hapus data yang berelasi
        restartIdentity: true // restart id dari 1
    })
})

describe('GET /user-courses', () => {
    test('should return a list of user courses', async () => {
        const response = await request(app)
            .get('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)
        expect(response.body).toBeInstanceOf(Array)
    })
})

describe('POST /user-courses', () => {
    const requestBody = {
        userId: 1
    };
    test('should return 400 if courseId is not provided', async () => {
        const response = await request(app)
            .post('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(requestBody)
            .expect(400)
        expect(response.body.message).toBe('courseId is required')
    })
})


describe('DELETE /user-courses', () => {
    test('should return 400 if courseId is not provided', async () => {
        const response = await request(app)
            .delete('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(400)
        expect(response.body.message).toBe('courseId is required')
    })
})

describe('POST /user-courses (store)', () => {
    test('should enroll a user in a course successfully', async () => {
        const newCourse = await Course.create({
            title: 'Katakana bersama Ryu Sensei',
            desc: 'Pelajari Katakana dengan mudah bersama Ryu Sensei.',
            sensei: 'Ryu Sensei',
            imageUrl: 'https://example.com/katakana.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const requestBody = {
            userId: 1, // Assuming the user created in beforeAll has ID 1
            courseId: newCourse.id,
        };

        const response = await request(app)
            .post('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(requestBody)
            .expect(200);

        expect(response.body).toHaveProperty('UserId', requestBody.userId);
        expect(response.body).toHaveProperty('CourseId', requestBody.courseId);
    });

    test('should return 400 if courseId is not provided', async () => {
        const requestBody = {
            userId: 1,
        };

        const response = await request(app)
            .post('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(requestBody)
            .expect(400);

        expect(response.body.error).toBe('courseId is required');
    });

    //     test('should return 404 if user is not found', async () => {
    //         const newCourse = await Course.create({
    //             title: 'Kanji bersama Ryu Sensei',
    //             desc: 'Pelajari Kanji dengan mudah bersama Ryu Sensei.',
    //             sensei: 'Ryu Sensei',
    //             imageUrl: 'https://example.com/kanji.jpg',
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //         });

    //         const requestBody = {
    //             userId: 9999, // Non-existent user ID
    //             courseId: newCourse.id,
    //         };

    //         const response = await request(app)
    //             .post('/user-courses')
    //             .set('Authorization', `Bearer ${accessToken}`)
    //             .send(requestBody)
    //             .expect(404);

    //         expect(response.body.error).toBe('error not found');
    //     });

    //     test('should return 401 if user email is not verified', async () => {
    //         const unverifiedUser = await User.create({
    //             email: 'unverified@example.com',
    //             password: await hashingPassword('password123'),
    //             emailVerifiedAt: null, // Email not verified
    //         });

    //         const newCourse = await Course.create({
    //             title: 'Kanji bersama Ryu Sensei',
    //             desc: 'Pelajari Kanji dengan mudah bersama Ryu Sensei.',
    //             sensei: 'Ryu Sensei',
    //             imageUrl: 'https://example.com/kanji.jpg',
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //         });

    //         const requestBody = {
    //             userId: unverifiedUser.id,
    //             courseId: newCourse.id,
    //         };

    //         const response = await request(app)
    //             .post('/user-courses')
    //             .set('Authorization', `Bearer ${accessToken}`)
    //             .send(requestBody)
    //             .expect(401);

    //         expect(response.body.error).toBe('You need to verify your email first');
    //     });

    //     test('should return 404 if course is not found', async () => {
    //         const requestBody = {
    //             userId: 1,
    //             courseId: 9999, // Non-existent course ID
    //         };

    //         const response = await request(app)
    //             .post('/user-courses')
    //             .set('Authorization', `Bearer ${accessToken}`)
    //             .send(requestBody)
    //             .expect(404);

    //         expect(response.body.error).toBe('error not found');
    //     });

    //     test('should return 400 if user is already enrolled in the course', async () => {
    //         const existingCourse = await Course.findOne(); // Assuming a course already exists
    //         const requestBody = {
    //             userId: 1,
    //             courseId: existingCourse.id,
    //         };

    //         const response = await request(app)
    //             .post('/user-courses')
    //             .set('Authorization', `Bearer ${accessToken}`)
    //             .send(requestBody)
    //             .expect(400);

    //         expect(response.body.error).toBe('You already enrolled in this course');
    //     });
});