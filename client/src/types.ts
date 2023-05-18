
export interface GatewayType {
  _id:string;
  serial: string;
  name: string;
  ip: string;
  peripherals: PeripheralType[];
}

export interface PeripheralType {
  _id:string;
  uid: number;
  vendor: string;
  status: string;
  gatewayId: string;
}



