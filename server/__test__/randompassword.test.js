const randomPasswordGenerator = require('../helpers/randomPasswordGenerator');

describe('randomPasswordGenerator', () => {
    test('should generate a password of default length 12', () => {
        const password = randomPasswordGenerator();
        expect(password).toHaveLength(12);
    });

    test('should generate a password of specified length', () => {
        const length = 16;
        const password = randomPasswordGenerator(length);
        expect(password).toHaveLength(length);
    });

    test('should generate a password containing only valid characters', () => {
        const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        const password = randomPasswordGenerator();
        for (let char of password) {
            expect(validCharacters).toContain(char);
        }
    });
});
