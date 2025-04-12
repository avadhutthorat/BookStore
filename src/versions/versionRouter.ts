import express from 'express'
import userRouter from '../user/userRouter'

const versionRouter = express.Router()

// Users
versionRouter.use('/users', userRouter)

export default versionRouter
