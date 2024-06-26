import request from 'supertest';
import express, { Express } from 'express';
import PlanesController from '../Controllers/PlanesController';

let app: Express;

beforeAll(() => {
    const planesController = new PlanesController();
    app = express();
    app.use(express.json());
    app.use('/', planesController.getRouter());
});

describe('PlanesController', () => {
    test('GET / - returns list of planes', async () => {
        const res = await request(app).get('/');

        expect(res.statusCode).toEqual(200);
        // the body should have non-zero length
        expect(res.body).not.toHaveLength(0);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('name');
        expect(res.body[0]).toHaveProperty('year');
        expect(res.body[0]).toHaveProperty('description');
        expect(res.body[0]).toHaveProperty('rangeInKm');
    });
});