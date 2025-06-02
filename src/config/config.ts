import { config as conf } from 'dotenv'

conf()

const config = {
  PORT: process.env.PORT,
  MONGO_URI_STRING: process.env.MONGO_URI,
  env: process.env.ENV,
  jwttoken: process.env.JWT_TOKEN,
  claudinary_name: process.env.CLAUDINARY_CLOUD_NAME,
  claudinary_key: process.env.CLAUDINARY_API_KEY,
  claudinary_secret: process.env.CLAUDINARY_API_SECRET,
  frontend_domains: process.env.FRONTEND_DOMAIN,
}

export default Object.freeze(config)
