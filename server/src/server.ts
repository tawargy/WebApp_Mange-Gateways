import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 5000;
const DB = 'mongodb://mongoDB:27017/gateways';
// const DB = 'mongodb://127.0.0.1:27017/gateways';

if (DB) {
  mongoose
    .connect(DB)
    .then(() => {
      console.log('DATABASE CONNECTED');
      app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
    })
    .catch(error => {
      let message;
      if (error instanceof Error) console.log(error.message);
    });
}
