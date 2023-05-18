import { RequestHandler } from 'express';
import { Gateway, Peripheral } from '../types';

type Status<T> = T & {
  message: string;
};
export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<Status<Res>>,
  Partial<Req>,
  any
>;
export type ExpressParamHandler<P, Req, Res> = RequestHandler<
  P,
  Partial<Status<Res>>,
  Partial<Req>,
  any
>;
export interface GatewaysReq {}
export interface GatewaysRes {
  data: Gateway[];
}
export type AddGatwayReq = Pick<Gateway, 'serial' | 'name' | 'ip'>;
export interface AddGatewayRes {
  data: Gateway;
}

export interface GetGatwayReq {}
export interface GetGatwayRes {
  data: Gateway;
}

export type UpdateGatwayReq = Pick<Gateway, 'serial' | 'name' | 'ip'>;
export interface UpdateGatwayRes {
  data: Gateway;
}

export interface DeleteGatwayReq {}
export interface DeleteGatwayRes {}

export interface GetPeripheralsReq {}
export interface GetPeripheralsRes {
  data: Peripheral[];
}

export interface AddPeripheralsReq extends Peripheral {}
export interface AddPeripheralsRes {
  data: Peripheral;
}
export interface UpdatePeripheralsReq extends Peripheral {}
export interface UpdatePeripheralsRes {
  data: Peripheral;
}
export interface DeletePeripheralsReq {}
export interface DeletePeripheralsRes {}
