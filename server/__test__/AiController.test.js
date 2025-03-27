const request = require('supertest')
const { expect, test, afterAll, describe } = require('@jest/globals')
const app = require('../app')
const { User } = require('../models/index')
const { signToken } = require('../helpers/jwt')
const { hashingPassword } = require('../helpers/bcrypt')

beforeAll(async () => {
    const user = await User.create({
        email: 'testuser@example.com',
        password: await hashingPassword('password123'),
        emailVerifiedAt: new Date()
    })
    accessToken = signToken({ id: user.id, email: user.email })
})

afterAll(async () => {
    await User.destroy({
        truncate: true, // hapus semua
        cascade: true, // hapus data yang berelasi
        restartIdentity: true // restart id dari 1
    })
})

describe('POST /romaji-transliterator', () => {
    const requestBody = {
        userId: 1
    };
    test('should return kanji', async () => {
        const response = await request(app)
            .post('/romaji-transliterator')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                romaji: 'jinsei'
            })
            .expect(200)
        expect(response.body.transliteration).toBe('人生')
    })

    test('should return 400 when no romaji provided', async () => {
        const response = await request(app)
            .post('/romaji-transliterator')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({

            })
            .expect(400)
        expect(response.body.message).toBe('Inputan tidak boleh kosong')
    })

    test('should return romaji', async () => {
        const response = await request(app)
            .post('/kanji-transliterator')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                kanji: '人生'
            })
            .expect(200)
        expect(response.body.transliteration).toBe('jinsei')
    })

    test('should return 400 when no kanji provided', async () => {
        const response = await request(app)
            .post('/kanji-transliterator')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({

            })
            .expect(400)
        expect(response.body.message).toBe('Inputan tidak boleh kosong')
    })

    test('should return 400 when input non kanji', async () => {
        const response = await request(app)
            .post('/kanji-transliterator')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                kanji: 'romaji'
            })
            .expect(400)
        expect(response.body.message).toBe('Inputan bukan kanji')
    })

    test('should return japanese translation', async () => {
        const response = await request(app)
            .post('/translate-to-japanese')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                text: 'bahasa jepang'
            })
            .expect(200)
        expect(response.body.translation).toBe('日本語')
    })

    test('should return indonesia translation', async () => {
        const response = await request(app)
            .post('/translate-to-indonesia')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                text: '日本語'
            })
            .expect(200)
        expect(response.body.translation).toBe('Bahasa Jepang')
    })
})