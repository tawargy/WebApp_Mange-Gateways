import { Schema, model } from 'mongoose';
import { Peripheral } from '../types';

const PeripheralSchema = new Schema<Peripheral>(
  {
    uid: {
      type: Number,
      unique: true,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return value === 'online' || value === 'offline';
        },
        message: 'Status must be `online` or `offline`.',
      },
    },
    gatewayId: {
      type: Schema.Types.ObjectId,
      ref: 'Gateway',
    },
  },
  {
    timestamps: true,
  }
);

const PeripheralModel = model('Peripheral', PeripheralSchema);
export default PeripheralModel;
