const authentication = require('../middleware/authentication');
const { verifyToken } = require('../helpers/jwt');

// server/middleware/authentication.test.js

jest.mock('../helpers/jwt');

describe('Authentication Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = { headers: {} };
        res = {};
        next = jest.fn();
    });

    it('should call next with an error if no authorization header is provided', () => {
        authentication(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            name: "Unauthorized",
            message: "unauthenticated : no headers with key authorization"
        }));
    });

    it('should call next with an error if authorization header does not start with "Bearer"', () => {
        req.headers.authorization = "Token abc123";
        authentication(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            name: "Unauthorized",
            message: "unauthenticated : no bearer token"
        }));
    });

    it('should call next with an error if authorization header is missing the token', () => {
        req.headers.authorization = "Bearer";
        authentication(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            name: "Unauthorized",
            message: "unauthenticated : no bearer token"
        }));
    });

    it('should call next with an error if verifyToken throws an error', () => {
        req.headers.authorization = "Bearer invalidToken";
        verifyToken.mockImplementation(() => {
            throw new Error("Invalid token");
        });
        authentication(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should set req.user and call next if token is valid', () => {
        const mockPayload = { id: 1, email: "test@example.com" };
        req.headers.authorization = "Bearer validToken";
        verifyToken.mockReturnValue(mockPayload);

        authentication(req, res, next);

        expect(req.user).toEqual(mockPayload);
        expect(next).toHaveBeenCalledWith();
    });
});