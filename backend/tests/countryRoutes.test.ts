import request from 'supertest';
import { app } from '../src/app';
import { redisClient } from '../src/redis/redis.js';
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';

// Flush Redis before all tests
beforeAll(async () => {
    await redisClient.flushAll();
});

// Quit Redis after all tests
afterAll(async () => {
    await redisClient.quit();
});

// Test suite for country routes
describe('Country routes', () => {
    it('increments twice and returns correct stats', async () => {
        await request(app)
            .post('/api/updateCountryCount')
            .send({ countryCode: 'US' })
            .expect(202);

        await request(app)
            .post('/api/updateCountryCount')
            .send({ countryCode: 'US' })
            .expect(202);

        const res = await request(app)
            .get('/api/getCountryStats')
            .expect(200);

        expect(res.body).toEqual({ us: 2 });
    });

    it('rejects bad country codes', async () => {
        const res = await request(app)
            .post('/api/updateCountryCount')
            .send({ countryCode: 'U$' })
            .expect(400);

        expect(res.body.errors[0].msg).toMatch(/ISO-3166/);
    });
});
