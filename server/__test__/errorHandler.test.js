const request = require('supertest')
const { expect, test, afterAll, describe } = require('@jest/globals')

const app = require('../app')
const { Course, User } = require('../models/index')
const { signToken } = require('../helpers/jwt')
const { hashingPassword } = require('../helpers/bcrypt')
const errorHandler = require('../middleware/errorHandler')
describe('errorHandler middleware', () => {
    const mockReq = {};
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const mockNext = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should handle BadRequest error', () => {
        const err = { name: "BadRequest", message: "Bad request error" };
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Bad request error" });
    });

    test('should handle Unauthorized error', () => {
        const err = { name: "Unauthorized", message: "Unauthorized access" };
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Unauthorized access" });
    });

    test('should handle JsonWebTokenError', () => {
        const err = { name: "JsonWebTokenError" };
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "token is invalid" });
    });

    test('should handle Forbidden error', () => {
        const err = { name: "Forbidden", message: "Access forbidden" };
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Access forbidden" });
    });

    test('should handle SequelizeValidationError', () => {
        const err = { name: "SequelizeValidationError", errors: [{ message: "Validation error" }] };
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Validation error" });
    });

    test('should handle SequelizeUniqueConstraintError', () => {
        const err = { name: "SequelizeUniqueConstraintError", errors: [{ message: "Unique constraint error" }] };
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Unique constraint error" });
    });

    test('should handle NotFound error', () => {
        const err = { name: "NotFound", message: "Resource not found" };
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Resource not found" });
    });

    test('should handle SequelizeDatabaseError', () => {
        const err = { name: "SequelizeDatabaseError", message: "Database error" };
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Database error" });
    });

    test('should handle TokenExpiredError', () => {
        const err = { name: "TokenExpiredError" };
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Verification link expired" });
    });

    test('should handle default case for unknown errors', () => {
        const err = { name: "UnknownError", message: "Something went wrong" };
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: `internal server error: ${err}` });
    });
});