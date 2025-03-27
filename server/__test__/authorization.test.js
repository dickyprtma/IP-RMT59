const authorization = require('../middleware/authorization');
const { Post } = require('../models/index');

jest.mock('../models/index', () => ({
    Post: {
        findByPk: jest.fn(),
    },
}));

describe('authorization middleware', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {
            user: {},
            params: {},
        };
        mockRes = {};
        mockNext = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should call next if user role is authorized', async () => {
        mockReq.user = { role: 'Admin' };
        const middleware = authorization(['Admin', 'Staff']);

        await middleware(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test('should throw Forbidden error if user role is not authorized', async () => {
        mockReq.user = { role: 'User' };
        const middleware = authorization(['Admin', 'Staff']);

        await middleware(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith({
            name: 'Forbidden',
            message: 'unauthorized : role must be Admin,Staff',
        });
    });

    test('should throw NotFound error if post is not found for Staff role', async () => {
        mockReq.user = { role: 'Staff', id: 1 };
        mockReq.params = { id: 1 };
        Post.findByPk.mockResolvedValue(null);
        const middleware = authorization(['Admin', 'Staff']);

        await middleware(mockReq, mockRes, mockNext);

        expect(Post.findByPk).toHaveBeenCalledWith(1);
        expect(mockNext).toHaveBeenCalledWith({
            name: 'NotFound',
            message: 'error not found',
        });
    });

    test('should throw Forbidden error if Staff tries to modify another user\'s post', async () => {
        mockReq.user = { role: 'Staff', id: 1 };
        mockReq.params = { id: 1 };
        Post.findByPk.mockResolvedValue({ authorId: 2 });
        const middleware = authorization(['Admin', 'Staff']);

        await middleware(mockReq, mockRes, mockNext);

        expect(Post.findByPk).toHaveBeenCalledWith(1);
        expect(mockNext).toHaveBeenCalledWith({
            name: 'Forbidden',
            message: 'unauthorized : you only can modify your own post',
        });
    });

    test('should call next if Staff modifies their own post', async () => {
        mockReq.user = { role: 'Staff', id: 1 };
        mockReq.params = { id: 1 };
        Post.findByPk.mockResolvedValue({ authorId: 1 });
        const middleware = authorization(['Admin', 'Staff']);

        await middleware(mockReq, mockRes, mockNext);

        expect(Post.findByPk).toHaveBeenCalledWith(1);
        expect(mockNext).toHaveBeenCalled();
    });
});