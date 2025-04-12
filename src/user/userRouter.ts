import express from 'express'
import { createUser } from './userController'
import { validate } from '../middlewares/validate'
import { registerSchema } from '../validations/userValidations'

const userRouter = express.Router()

userRouter.post('/register', validate(registerSchema), createUser)

export default userRouter
