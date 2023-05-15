import { Schema, model } from 'mongoose';
import { Gateway } from '../types';
import net from 'net';

const GatewaySchema = new Schema<Gateway>(
  {
    serial: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return net.isIPv4(value);
        },
        message: 'Invalid IPv4 address.',
      },
    },
    peripherals: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Peripheral',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const GatewayModel = model('Gateway', GatewaySchema);
export default GatewayModel;
