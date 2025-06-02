import express from 'express'
import cors from 'cors'
import { globalErrorHandler } from './middlewares/global-error-handler'
import versionRouter from './versions/versionRouter'
import config from './config/config'

const app = express()

app.use(
  cors({
    origin: config.frontend_domains,
  })
)
app.use(express.json())

// V1 version
app.use('/api/v1', versionRouter)

app.use(globalErrorHandler)

export default app
