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

    test('should return 404 if user is not found', async () => {
        const newCourse = await Course.create({
            title: 'Katakana bersama Ryu Sensei',
            desc: 'Pelajari Katakana dengan mudah bersama Ryu Sensei.',
            sensei: 'Ryu Sensei',
            imageUrl: 'https://example.com/katakana.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const requestBody = {
            userId: 9999, // Assuming the user created in beforeAll has ID 1
            courseId: newCourse.id,
        };

        const response = await request(app)
            .post('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(requestBody)
            .expect(404);

        expect(response.body.message).toBe("error not found");
    });

    test('should return 400 if courseId is not provided', async () => {
        const requestBody = {
            userId: 1
        };

        const response = await request(app)
            .post('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(requestBody)
            .expect(400);

        expect(response.body.message).toBe("courseId is required");
    });

    test('should return 401 if user email is not verified', async () => {
        const unverifiedUser = await User.create({
            email: 'unverified@example.com',
            password: await hashingPassword('password123'),
            emailVerifiedAt: null, // Email not verified
        });

        const newCourse = await Course.create({
            title: 'Katakana bersama Ryu Sensei',
            desc: 'Pelajari Katakana dengan mudah bersama Ryu Sensei.',
            sensei: 'Ryu Sensei',
            imageUrl: 'https://example.com/katakana.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const response = await request(app)
            .post('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                userId: unverifiedUser.id,
                courseId: newCourse.id,
            })
            .expect(401);

        expect(response.body.message).toBe("You need to verify your email first");
    });

    test('should return 404 if course is not found', async () => {
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
            courseId: 999,
        };

        const response = await request(app)
            .post('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(requestBody)
            .expect(404);

        expect(response.body.message).toBe("error not found");
    });

    describe('POST /user-courses (store)', () => {
        test('should return 400 if user is already enrolled in the course', async () => {
            const existingCourse = await Course.create({
                title: 'Kanji bersama Ryu Sensei',
                desc: 'Pelajari Kanji dengan mudah bersama Ryu Sensei.',
                sensei: 'Ryu Sensei',
                imageUrl: 'https://example.com/kanji.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const existingUserCourse = await UserCourse.create({
                UserId: 1, // Assuming the user created in beforeAll has ID 1
                CourseId: existingCourse.id,
            });

            const requestBody = {
                userId: existingUserCourse.UserId,
                courseId: existingUserCourse.CourseId,
            };

            const response = await request(app)
                .post('/user-courses')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(requestBody)
                .expect(400);

            expect(response.body.message).toBe("You already enrolled in this course");
        });
    });
});

describe('DELETE /user-courses', () => {
    test('should unenroll a user from a course successfully', async () => {
        UserCourse.create({
            UserId: 1,
            CourseId: 1
        })

        const response = await request(app)
            .delete('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ userId: 1, courseId: 1 })
            .expect(200)
        expect(response.body.message).toBe('Course unenrolled successfully')
    })

    test('should return 400 if courseId is not provided', async () => {
        UserCourse.create({
            UserId: 1,
            CourseId: 1
        })

        const response = await request(app)
            .delete('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ userId: 1 })
            .expect(400);

        expect(response.body.message).toBe('courseId is required');
    });

    test('should return 404 if user is not found', async () => {
        UserCourse.create({
            UserId: 1,
            CourseId: 1
        })
        const response = await request(app)
            .delete('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ userId: 9999, courseId: 1 })
            .expect(404);

        expect(response.body.message).toBe('error not found');
    });

    test('should return 404 if course is not found', async () => {
        UserCourse.create({
            UserId: 1,
            CourseId: 1
        })
        const response = await request(app)
            .delete('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ userId: 1, courseId: 9999 })
            .expect(404);

        expect(response.body.message).toBe('error not found');
    });

    test('should return 400 if user is not enrolled in the course', async () => {
        const user = await User.create({
            email: 'notenrolleduser@example.com',
            password: await hashingPassword('password123'),
            emailVerifiedAt: new Date(),
        });

        UserCourse.create({
            UserId: 1,
            CourseId: 1
        })

        const response = await request(app)
            .delete('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ userId: user.id, courseId: 1 })
            .expect(400);

        expect(response.body.message).toBe('You are not enrolled in this course');
    });

    test('should return 401 if unenrolled another user course', async () => {
        const currentUser = await User.create({
            email: 'newUseragain@example.com',
            password: await hashingPassword('password123'),
            emailVerifiedAt: new Date(),
        });
        const currentUserAccessToken = signToken({ id: currentUser.id, email: currentUser.email })

        const anotherUser = await User.create({
            email: 'anotheruser@example.com',
            password: await hashingPassword('password123'),
            emailVerifiedAt: new Date(),
        });
        UserCourse.create({
            UserId: anotherUser.id,
            CourseId: 1
        })


        const response = await request(app)
            .delete('/user-courses')
            .set('Authorization', `Bearer ${currentUserAccessToken}`)
            .send({ userId: anotherUser.id, courseId: 1 })
            .expect(401);

        expect(response.body.message).toBe('You are not authorized to unenroll from this course');
    });
})

describe('PATCH /user-courses', () => {
    test('should add a course to favorites successfully', async () => {
        const userCourse = UserCourse.create({
            UserId: 1,
            CourseId: 1
        })
        const response = await request(app)
            .patch('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ userId: 1, courseId: 1 })
            .expect(200);
        expect(response.body.message).toBe('Course added to favorite');
    });

    test('should remove a course from favorites successfully', async () => {
        UserCourse.create({
            UserId: 1,
            CourseId: 1,
            favorite: true
        })
        const response = await request(app)
            .patch('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ userId: 1, courseId: 1 })
            .expect(200);
        expect(response.body.message).toBe('Course removed from favorite');
    });

    test('should return 400 if userId is not provided', async () => {
        const response = await request(app)
            .patch('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ courseId: 1 })
            .expect(400);

        expect(response.body.message).toBe('userId is required');
    });

    test('should return 400 if courseId is not provided', async () => {
        const response = await request(app)
            .patch('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ userId: 1 })
            .expect(400);

        expect(response.body.message).toBe('courseId is required');
    });

    test('should return 404 if userCourse is not found', async () => {
        const response = await request(app)
            .patch('/user-courses')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ userId: 9999, courseId: 9999 })
            .expect(404);

        expect(response.body.message).toBe('error not found');
    });
});