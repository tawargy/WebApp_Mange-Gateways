import createHttpError from 'http-errors';
import PeripheralModel from '../models/Peripheral';
import {
  ExpressHandler,
  ExpressParamHandler,
  GetPeripheralsReq,
  GetPeripheralsRes,
  AddPeripheralsReq,
  AddPeripheralsRes,
  UpdatePeripheralsReq,
  UpdatePeripheralsRes,
  DeletePeripheralsReq,
  DeletePeripheralsRes,
} from './apiTypes';
import GatewayModel from '../models/Gateway';
import { Gateway } from '../types';

export const getPeripherals: ExpressHandler<GetPeripheralsReq, GetPeripheralsRes> = async (
  req,
  res
) => {
  const pers = await PeripheralModel.find();
  res.status(200).json({ data: pers });
};

export const addPeripheral: ExpressHandler<AddPeripheralsReq, AddPeripheralsRes> = async (
  req,
  res,
  next
) => {
  const { uid, status, vendor, gatewayId } = req.body;

  if (!uid || !status || !vendor || !gatewayId) {
    return next(createHttpError(400, 'All fields is required'));
  }
  if (typeof uid !== 'number') {
    return next(createHttpError(400, 'uid must be a number'));
  }
  let gateway: Gateway | undefined;
  try {
    const gateway = await GatewayModel.findById(gatewayId);
    if (!gateway) return next(createHttpError(404, 'ok'));
    if (gateway.peripherals.length >= 10) {
      return next(createHttpError(400, 'Gateway stack is full'));
    }
  } catch (err) {
    if (err instanceof Error) {
      return next(createHttpError(400, 'Invalid Gateway Id'));
    }
  }

  try {
    const peripheral = new PeripheralModel({ uid, status, vendor, gatewayId });
    const per = await peripheral.save();

    await GatewayModel.findByIdAndUpdate(
      { _id: gatewayId },
      { $push: { peripherals: per._id } },
      { new: true }
    );
    res.status(200).json({ data: per });
  } catch (err: any) {
    if (err.code === 11000) {
      return next(createHttpError(400, 'uid already exist try another one'));
    }
    if (err?.errors?.status) {
      return next(createHttpError(400, err.errors.status.message));
    }
    return next(createHttpError(500, 'Something went wrong'));
  }
};

export const updatePeripheral: ExpressParamHandler<
  { id: string },
  UpdatePeripheralsReq,
  UpdatePeripheralsRes
> = async (req, res, next) => {
  const id = req.params.id;
  const { uid, status, vendor } = req.body;
  if (!uid || !status || !vendor) {
    return next(createHttpError(400, 'The fields not allow to be undefined'));
  }
  if (status !== 'online' && status !== 'offline') {
    return next(createHttpError(400, "Status must be 'online' or 'offline'"));
  }
  try {
    const peripheral = await PeripheralModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!peripheral) throw new Error('The Peripheral not exist');
    res.status(201).json({ data: peripheral });
  } catch (err: any) {
    if (err.code === 11000) {
      return next(createHttpError(400, 'uid already exist try another one'));
    }
    if (err.name === 'CastError') {
      return next(createHttpError(400, 'The Peripheral not exist'));
    }
    return next(createHttpError(500, 'Something went wrong'));
  }
};

export const deletePeripheral: ExpressParamHandler<
  { id: string },
  DeletePeripheralsReq,
  DeletePeripheralsRes
> = async (req, res, next) => {
  const id = req.params.id;

  try {
    await PeripheralModel.findByIdAndDelete(id);
    res.status(201).json({ message: 'success' });
  } catch (err: any) {
    if (err.name === 'CastError') {
      return next(createHttpError(400, 'The Peripheral not exist'));
    }
    return next(createHttpError(500, 'Something went wrong'));
  }
};
