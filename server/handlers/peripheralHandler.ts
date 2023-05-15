import mongoose from 'mongoose'
import createHttpError from 'http-errors'
import Peripheral from '../models/Peripheral'
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
} from './apiTypes'
import Gateway from '../models/Gateway'

export const getPeripherals: ExpressHandler<
  GetPeripheralsReq,
  GetPeripheralsRes
> = async (req, res) => {
  const pers = await Peripheral.find()
  res.status(200).json({data: pers})
}

export const addPeripheral: ExpressHandler<
  AddPeripheralsReq,
  AddPeripheralsRes
> = async (req, res, next) => {
  const {uid, status, vendor, gatewayId} = req.body

  if (!uid || !status || !vendor || !gatewayId) {
    return next(createHttpError(400, 'All fields is required'))
  }
  if(typeof uid !=="number"){
  return next(createHttpError(400, 'uid must be a number'))

  }
  console.log(gatewayId)
  const gateway = await Gateway.findById(gatewayId)
  if (!gateway) {
    return next(createHttpError(404, 'Invalid gateway'))
  }

  if (gateway.peripherals.length >= 10) {
    return next(createHttpError(400, 'gateway is full'))
  }
  const peripheral = new Peripheral({uid, status, vendor, gatewayId})
  const per = await peripheral.save()
  gateway.peripherals.push(per._id)
  await gateway.save()

  res.status(200).json({data: per})
}

export const updatePeripheral: ExpressParamHandler<
  {id: string},
  UpdatePeripheralsReq,
  UpdatePeripheralsRes
> = async (req, res, next) => {
  const id = req.params.id
  const gateway = await Peripheral.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  if (!gateway) {
    return next(createHttpError(404, 'this gateway is not exist'))
  }
  res.status(201).json({data: gateway})
}

export const deletePeripheral: ExpressParamHandler<
  {id: string},
  DeletePeripheralsReq,
  DeletePeripheralsRes
> = async (req, res, next) => {
  const id = req.params.id
  const per = await Peripheral.findByIdAndDelete(id)
  if (!per) {
    return next(createHttpError(404, 'this gateway is not exist'))
  }
  res.status(201).json({message: 'success'})
}
