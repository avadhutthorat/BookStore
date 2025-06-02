import { v2 as cloudinary } from 'cloudinary'
import config from './config'

cloudinary.config({
  cloud_name: config.claudinary_name,
  api_key: config.claudinary_key,
  api_secret: config.claudinary_secret, // Click 'View API Keys' above to copy your API secret
})

export default cloudinary
