import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'
export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    if (error) {
      console.log({ ...error })
      res.status(400).json({ message: error.details[0].message })
      return
    }

    next()
  }
}
