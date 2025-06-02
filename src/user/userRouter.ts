import express from 'express'
import { registerUser, loginUser } from './userController'
import { validate } from '../middlewares/validate'
import { registerSchema, loginSchema } from '../validations/userValidations'

const userRouter = express.Router()

userRouter.post('/register', validate(registerSchema), registerUser)
userRouter.post('/login', validate(loginSchema), loginUser)

export default userRouter
