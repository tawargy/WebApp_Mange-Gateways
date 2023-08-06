export interface GatewayType {
  _id?: string;
  serial: string;
  name: string;
  ip: string;
  peripherals: PeripheralType[];
  message?: string;
}

export interface PeripheralType {
  _id?: string;
  uid: number;
  vendor: string;
  status: string;
  gatewayId: string;
}

//  getGatways
export type GetGatewayRes = {
  data: GatewayType[];
  message?: string;
};

// getGatwayById
export type GetGatewayByIdRes = {
  data: GatewayType;
  message?: string;
};

//  addGateway
export type GatewayAddParam = Pick<GatewayType, 'serial' | 'name' | 'ip'>;
export type AddGatewayRes = {
  data: GatewayType;
  message?: string;
};
//  updateGatway
export type GatewayUpdateParam = Pick<
  GatewayType,
  '_id' | 'serial' | 'name' | 'ip'
>;
export type UpdateGatewayRes = {
  data: GatewayType;
  message?: string;
};
//  deleteGatway
export type DeleteGatewayRes = {
  data: GatewayType;
  message?: string;
};

// addPeripheral
export type PeripheralAddParam = Pick<
  PeripheralType,
  'uid' | 'vendor' | 'status' | 'gatewayId'
>;
export type AddPerRes = {
  data: PeripheralType;
  message?: string;
};

// updatePeripheral
export type PeripheralUpdateParam = Pick<
  PeripheralType,
  '_id' | 'uid' | 'vendor' | 'status'
>;
export type UpdatePerRes = {
  data: PeripheralType;
  message?: string;
};
