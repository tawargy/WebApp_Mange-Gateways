import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Something went wrong';
  return res.status(err.status).send({ message: err.message });
};
