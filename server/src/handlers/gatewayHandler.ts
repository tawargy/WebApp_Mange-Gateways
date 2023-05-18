import createHttpError from 'http-errors';
import GatewayModel from '../models/Gateway';
import net from 'net';
import {
  ExpressHandler,
  ExpressParamHandler,
  GatewaysReq,
  GatewaysRes,
  AddGatewayRes,
  AddGatwayReq,
  GetGatwayReq,
  GetGatwayRes,
  UpdateGatwayReq,
  UpdateGatwayRes,
  DeleteGatwayReq,
  DeleteGatwayRes,
} from './apiTypes';

export const getGateways: ExpressHandler<GatewaysReq, GatewaysRes> = async (req, res) => {
  const gateways = await GatewayModel.find();
  res.status(200).json({ data: gateways });
};

export const addGateway: ExpressHandler<AddGatwayReq, AddGatewayRes> = async (req, res, next) => {
  const { serial, name, ip } = req.body;
  if (!serial || !name || !ip) {
    return next(createHttpError(400, 'All fields is required'));
  }
  try {
    const gateway = new GatewayModel({
      serial: serial,
      name: name,
      ip: ip,
    });
    await gateway.save();
    res.status(201).json({ data: gateway });
  } catch (err: any) {
    console.log(err);
    if (err.code === 11000) {
      return next(createHttpError(400, 'Serial have to be unique '));
    }
    if (err.errors.ip) {
      return next(createHttpError(400, err.errors.ip.message));
    }
    return next(createHttpError(500, 'Something went wrong'));
  }
};
export const getGateway: ExpressParamHandler<{ id: string }, GetGatwayReq, GetGatwayRes> = async (
  req,
  res,
  next
) => {
  const id = req.params.id;
  try {
    const gateway = await GatewayModel.findById(id).populate('peripherals');
    if (!gateway) throw new Error('The gateway not exist');
    res.status(201).json({ data: gateway });
  } catch (err: any) {
    if (err.name === 'CastError') {
      return next(createHttpError(400, 'The Gateway not exist'));
    }
    return next(createHttpError(500, 'Something went wrong'));
  }
};

export const updateGateway: ExpressParamHandler<
  { id: string },
  UpdateGatwayReq,
  UpdateGatwayRes
> = async (req, res, next) => {
  const id = req.params.id;

  const { serial, name, ip } = req.body;
  if (!serial || !name || !ip) {
    return next(createHttpError(400, 'The fields not allow to be undefined'));
  }
  if (serial === ' ' || name === ' ') {
    return next(createHttpError(400, 'The fields not allow to be empty'));
  }
  if (!net.isIPv4(ip)) {
    return next(createHttpError(400, 'Invalid IPv4 address'));
  }
  try {
    const gateway = await GatewayModel.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate('peripherals');
    if (!gateway) throw new Error('The gateway not exist');
    res.status(201).json({ data: gateway });
  } catch (err: any) {
    if (err.code === 11000) {
      return next(createHttpError(400, 'Serial have to be unique'));
    }
    return next(createHttpError(500, 'Something went wrong'));
  }
};

export const deleteGateway: ExpressParamHandler<
  { id: string },
  DeleteGatwayReq,
  DeleteGatwayRes
> = async (req, res, next) => {
  const id = req.params.id;
  try {
    await GatewayModel.findByIdAndDelete(id);
    res.status(201).json({ message: 'success' });
  } catch (err: any) {
    if (err.name === 'CastError') {
      return next(createHttpError(400, 'The Gateway not exist'));
    }
    return next(createHttpError(500, 'Something went wrong'));
  }
};
