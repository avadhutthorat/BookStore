import express, { NextFunction, Request, Response } from 'express'
import createHttpError, { HttpError } from 'http-errors'
import config from './config/config'
import { globalErrorHandler } from './middlewares/global-error-handler'
import versionRouter from './versions/versionRouter'

const app = express()

app.use(express.json())

app.get('/', (req, res, next) => {
  const error = createHttpError(400, 'Something went wrong')
  throw error
  res.json({ message: 'welcome Avadhut' })
})

// V1 version
app.use('/api/v1', versionRouter)

app.use(globalErrorHandler)

export default app
