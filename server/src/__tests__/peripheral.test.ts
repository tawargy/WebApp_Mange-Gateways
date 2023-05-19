import supertest from 'supertest';
import app from '../app';
import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'

beforeAll(async()=>{
  const mongoServer=await MongoMemoryServer.create() 
  await mongoose.connect(mongoServer.getUri())
})

afterAll(async()=>{
  await mongoose.disconnect()
  await mongoose.connection.close()
})



describe('peripheral', () => {
  describe(' peripheral route', () => {
    describe('given the peripheral cant create new one', () => {
      it('should return 400', async () => {
        const payload = {};
        await supertest(app).post(`/peripheral`).send({ payload }).expect(400);
      });
    });
  });

  describe('peripheral route', () => {
    describe('given the peripheral does not have gatewayIdis', () => {
      it('should return 200 and peripheral', async () => {
        const payload = {
          uid: 235555,
          vendor: 'ted',
          status: 'offline',
          gatewayId: '64648c995b0df2603a9e57e2',
        };
        await supertest(app).post(`/peripheral/`).send({... payload }).expect(404);
      });
    });
  });

});
