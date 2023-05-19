import supertest from 'supertest';
import app from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const payload = {
  serial: '1234567xxx',
  name: 'rrr',
  ip: '192.178.1.11',
};

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe('gateway route', () => {
  describe(' gateway ', () => {
    describe('given the gateways array', () => {
      it('should return 200 and gateway[]', async () => {
        await supertest(app).get('/gateway').expect(200);
      });
    });
  });

  describe('given the gateway cant create new one', () => {
    it('should return 400', async () => {
      await supertest(app).post(`/gateway`).send({}).expect(400);
    });
  });

  describe('given the gateway created new one', () => {
    it('should return 201 and gateway', async () => {
      await supertest(app)
        .post(`/gateway`)
        .send({ ...payload })
        .expect(201);
    });
  });


});
