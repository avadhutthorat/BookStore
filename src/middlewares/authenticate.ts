import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { verify } from 'jsonwebtoken'
import config from '../config/config'
import CustomRequest from '../utils/customRequest'

export const authenticate = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')
  if (!token) {
    return next(createHttpError(401, 'Authorization token is required.'))
  }

  try {
    const parsedToken = token.split(' ')[1]

    const tokenData = verify(parsedToken, config.jwttoken as string)
    req.userId = tokenData.sub as string
    next()
  } catch (error) {
    return next(createHttpError('401', 'Token expired'))
  }
}
