import createHttpError from 'http-errors'
import Gateway from '../models/Gateway'
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
} from './apiTypes'

export const getGateways: ExpressHandler<GatewaysReq, GatewaysRes> = async (
  req,
  res,
) => {
  const gateways = await Gateway.find()
  res.status(200).json({data: gateways})
}

export const addGateway: ExpressHandler<AddGatwayReq, AddGatewayRes> = async (
  req,
  res,
  next,
) => {
  const {serial, name, ip} = req.body
  if (!serial || !name || !ip) {
    return next(createHttpError(401, 'All fields is required'))
  }

  const gateway = new Gateway({
    serial: serial,
    name: name,
    ip: ip,
  })
  await gateway.save()
  res.status(201).json({data: gateway})
}
export const getGateway: ExpressParamHandler<
  {id: string},
  GetGatwayReq,
  GetGatwayRes
> = async (req, res, next) => {
  const id = req.params.id
  const gateway = await Gateway.findById(id).populate('peripherals')
  if (!gateway) {
    return next(createHttpError(404, 'this gateway is not exist'))
  }
  res.status(201).json({data: gateway})
}

export const updateGateway: ExpressParamHandler<
  {id: string},
  UpdateGatwayReq,
  UpdateGatwayRes
> = async (req, res, next) => {
  const id = req.params.id
  const gateway = await Gateway.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  if (!gateway) {
    return next(createHttpError(404, 'this gateway is not exist'))
  }
  res.status(201).json({data: gateway})
}

export const deleteGateway: ExpressParamHandler<
  {id: string},
  DeleteGatwayReq,
  DeleteGatwayRes
> = async (req, res, next) => {
  const id = req.params.id
  const gateway = await Gateway.findByIdAndDelete(id)
  if (!gateway) {
    return next(createHttpError(404, 'this gateway is not exist'))
  }
  res.status(201).json({message: 'success'})
}
