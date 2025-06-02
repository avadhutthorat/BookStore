import express, { NextFunction, Request, Response } from 'express'
import userModel from './userModel'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import config from '../config/config'
import { user } from './userTypes'

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body

  // check if email exists

  try {
    const user = await userModel.findOne({ email: email })

    if (user) {
      const error = createHttpError(400, 'User already exists with this email.')

      return next(error)
    }
  } catch (error) {
    return next(createHttpError(400, 'Not able to fetch user email'))
  }

  let savedUser: user
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // save
    savedUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    })

    // create token
    const token = sign({ sub: savedUser._id }, config.jwttoken as string, {
      expiresIn: '7D',
      algorithm: 'HS256',
    })

    // Send res back with access token
    res.json({
      accessToken: token,
    })
  } catch (error) {
    return next(createHttpError(400, 'Not able to save user.'))
  }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  try {
    const user = await userModel.findOne({ email })

    if (!user) {
      return next(createHttpError(400, 'User not found !'))
    }

    const isPassMatched = await bcrypt.compare(password, user.password)

    if (!isPassMatched) {
      return next(createHttpError(401, 'Password does not matched'))
    }

    const token = sign({ sub: user._id }, config.jwttoken as string, {
      expiresIn: '2h',
      algorithm: 'HS256',
    })

    res.json({
      accessToken: token,
    })
  } catch (error) {
    return next(createHttpError(400, 'Error while singing in.'))
  }
}

export { registerUser, loginUser }
