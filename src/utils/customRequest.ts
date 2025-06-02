import { Request } from 'express'

// Create a custom interface
interface CustomRequest extends Request {
  userId?: string // Add your new field here
}

export default CustomRequest
