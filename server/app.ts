import express, { RequestHandler, ErrorRequestHandler } from 'express';
import {
  getGateways,
  addGateway,
  getGateway,
  updateGateway,
  deleteGateway,
} from './handlers/gatewayHandler';
import {
  addPeripheral,
  deletePeripheral,
  getPeripherals,
  updatePeripheral,
} from './handlers/peripheralHandler';
import { errorHandler } from './utils/ErrorHandler';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';

const app: express.Application = express();
app.use(express.json());

const logger: RequestHandler = (req, res, next) => {
  console.log('Headers', req.headers);
  console.log('Body', req.body);
  next();
};
app.use(logger);
app.get('/healthz', (req, res) => {
  res.status(200).send({ status: '✌️' });
});

app.get('/gateway', asyncHandler(getGateways));
app.post('/gateway', asyncHandler(addGateway));
app.get('/gateway/:id', asyncHandler(getGateway));
app.put('/gateway/:id', asyncHandler(updateGateway));
app.delete('/gateway/:id', asyncHandler(deleteGateway));

app.get('/peripheral', asyncHandler(getPeripherals));
app.post('/peripheral', asyncHandler(addPeripheral));
app.put('/peripheral/:id', asyncHandler(updatePeripheral));
app.delete('/peripheral/:id', asyncHandler(deletePeripheral));

app.all('*', (req, res, next) => {
  next(createError(404, 'The page notFound'));
});

app.use(errorHandler);

export default app;
