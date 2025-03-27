const request = require("supertest")
const app = require('../app')
const { expect, describe, beforeAll, afterAll } = require("@jest/globals")
const { User } = require('../models/index')
const { hashingPassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const MOCK_GOOGLE_TOKEN = require('./test_env')


beforeAll(async () => {
    await User.bulkCreate([
        {
            email: 'usertest@example.com',
            password: await hashingPassword('12345678'),
            role: 'User',
            emailVerifiedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ])
})

afterAll(async () => {
    await User.destroy({
        truncate: true, // hapus semua
        cascade: true, // hapus data yang berelasi
        restartIdentity: true // restart id dari 1
    })
})

describe('POST /login', () => {
    const email = "usertest@example.com"
    const password = "12345678"
    it('should success and send access_token', async () => {
        const reqBody = {
            email: email,
            password: password
        }
        const response = await request(app).post("/login").send(reqBody)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("access_token")
    })

    it('should fail when email is not provided', async () => {
        const reqBody = {
            password: password
        };

        const response = await request(app).post("/login").send(reqBody)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toMatch('email is required')
    })

    it('should fail when password is not provided', async () => {
        const reqBody = {
            email: email
        };

        const response = await request(app).post("/login").send(reqBody)

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toMatch('password is required')
    })

    it('should invalid when email not registered', async () => {
        const reqBody = {
            email: "unregistered@example.com",
            password: "12345678"
        };

        const response = await request(app).post("/login").send(reqBody)

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toMatch("email or password is invalid");
    })

    it('should invalid when password not registered', async () => {
        const reqBody = {
            email: "admin@example.com",
            password: "123456789"
        };

        const response = await request(app).post("/login").send(reqBody)

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toMatch('email or password is invalid');
    })
})

describe('POST /register', () => {
    it('should successfully register a new user and send verification email', async () => {
        const reqBody = {
            email: "newuser@example.com",
            password: "12345678"
        };

        const response = await request(app).post("/register").send(reqBody);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "register success");
        expect(response.body.data).toHaveProperty("email", reqBody.email);
        expect(response.body.data).not.toHaveProperty("password");
    });

    it('should fail when email is not provided', async () => {
        const reqBody = {
            password: "12345678"
        };

        const response = await request(app).post("/register").send(reqBody);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "email is required");
    });

    it('should fail when password is not provided', async () => {
        const reqBody = {
            email: "newuser@example.com"
        };

        const response = await request(app).post("/register").send(reqBody);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "password is required");
    });
});

describe('GET /verify-email', () => {
    let verificationToken;

    beforeAll(async () => {
        const user = await User.create({
            email: "verifyuser@example.com",
            password: await hashingPassword("12345678"),
            emailVerifiedAt: null,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        verificationToken = signToken({ id: user.id }, '1h');
    });

    it('should successfully verify email', async () => {
        const response = await request(app).get(`/verify-email?token=${verificationToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Email verification successful");
    });

    it('should fail when token is not provided', async () => {
        const response = await request(app).get("/verify-email");

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Token is required");
    });

    it('should fail when token is invalid', async () => {
        const response = await request(app).get("/verify-email?token=invalidtoken");

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    });
});

describe('POST /google-login', () => {
    it('should successfully login or register a user with Google', async () => {
        const mockGoogleToken = MOCK_GOOGLE_TOKEN; // Replace with a valid mock token if needed
        const response = await request(app).post("/google-login").send({ googleToken: mockGoogleToken });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "login success");
        expect(response.body).toHaveProperty("access_token");
        expect(response.body.data).toHaveProperty("id");
    });

    it('should fail when googleToken is not provided', async () => {
        const response = await request(app).post("/google-login").send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    });
});

