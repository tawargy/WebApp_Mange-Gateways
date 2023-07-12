
export interface GatewayType {
  _id?:string;
  serial: string;
  name: string;
  ip: string;
  peripherals: PeripheralType[];
  message?:string
}

export interface PeripheralType {
  _id?:string;
  uid: number;
  vendor: string;
  status: string;
  gatewayId: string;
}



export type GetGatewayRes = {
  data: GatewayType[]
  message?: string
}
export type GetGatewayByIdRes = {
  data: GatewayType
  message?: string
}

export type gatewayAdd = Pick<GatewayType, 'serial' | 'name' | 'ip'>
export type AddGatewayRes = {
  data: GatewayType
  message?: string
}

export type gatewayUpdate = Pick<GatewayType, '_id' | 'serial' | 'name' | 'ip'>
export type UpdateGatewayRes = {
  data: GatewayType
  message?: string
}
export type DeleteGatewayRes = {
  data: GatewayType
  message?: string
}

export type peripheralAdd = Pick<
  PeripheralType,
  'uid' | 'vendor' | 'status' | 'gatewayId'
>
export type AddPerRes = {
  data: PeripheralType
  message?: string
}

export type peripheralUpdate = Pick<
  PeripheralType,
  '_id' | 'uid' | 'vendor' | 'status'
>
export type UpdatePerRes = {
  data: PeripheralType
  message?: string
}

