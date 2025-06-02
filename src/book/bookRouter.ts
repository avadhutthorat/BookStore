import express from 'express'
import multer from 'multer'
import {
  createBook,
  updateBook,
  getBookList,
  getSingleBook,
  deleteSingleBook,
} from './bookController'
import path from 'node:path'
const bookRouter = express.Router()

const upload = multer({
  dest: path.resolve(__dirname, '../../public/data/uploads'),
  limits: { fileSize: 3e7 },
})

bookRouter.post(
  '/create',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    {
      name: 'file',
      maxCount: 1,
    },
  ]),
  createBook
)

bookRouter.patch(
  '/:bookId',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    {
      name: 'file',
      maxCount: 1,
    },
  ]),
  updateBook
)

bookRouter.get('/', getBookList)

bookRouter.get('/:bookId', getSingleBook)

bookRouter.delete('/:bookId', deleteSingleBook)

export default bookRouter
