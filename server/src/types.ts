import { Types } from 'mongoose';
export interface Gateway {
  serial: string;
  name: string;
  ip: string;
  peripherals: Types.ObjectId[];
}

export interface Peripheral {
  uid: number;
  vendor: string;
  status: string;
  gatewayId: Types.ObjectId;
}
