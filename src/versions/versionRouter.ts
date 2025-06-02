import express from 'express';
import userRouter from '../user/userRouter';
import bookRouter from '../book/bookRouter';
import { authenticate } from '../middlewares/authenticate';

const versionRouter = express.Router();

// Users
versionRouter.use('/users', userRouter);
versionRouter.use('/books', authenticate, bookRouter);

export default versionRouter;
