import { config as conf } from 'dotenv'

conf()

const config = {
  PORT: process.env.PORT,
  MONGO_URI_STRING: process.env.MONGO_URI,
  env: process.env.ENV,
}

export default Object.freeze(config)
