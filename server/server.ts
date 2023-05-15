import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import app from './app'

const PORT = process.env.PORT || 5000
const DB = process.env.DB_URL

if (DB) {
  mongoose
    .connect(DB)
    .then(() => {
      console.log('DATABASE CONNECTED')
      app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))
    })
    .catch((error) => {
      let message
      if (error instanceof Error) console.log(error.message)
    })
}
