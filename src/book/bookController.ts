import { NextFunction, Request, Response } from 'express';
import {
  deleteResourceFromCloudinary,
  uploadBookPdf,
  uploadCoverImage,
} from '../utils/bookUtils';
import bookModel from './bookModel';
import CustomRequest from '../utils/customRequest';
import createHttpError from 'http-errors';

const createBook = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, genre } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  try {
    // Upload cover image
    const coverImageUploadeResult = await uploadCoverImage(files, next);
    // Upload pdf
    const bookUploadResult = await uploadBookPdf(files, next);
    console.log({ coverImageUploadeResult, bookUploadResult });
    const newBook = await bookModel.create({
      title,
      genre,
      author: req.userId,
      coverImage: coverImageUploadeResult?.secure_url,
      file: bookUploadResult?.secure_url,
    });

    console.log({
      newBook,
    });
    // Response
    res.status(201).json({
      id: newBook._id,
    });
  } catch (error) {
    console.log('Errro data -', error);
    return next(createHttpError(500, `Failed to create a book ${error}`));
  }
};

const updateBook = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, genre } = req.body;
  console.log({
    userId: req.userId,
    body: {
      ...req.body,
    },
    bookId: req.params.bookId,
  });

  const bookId = req.params.bookId;

  const bookData: any = await bookModel.findOne({ _id: bookId });
  console.log({
    authorId: bookData?.author?.toString(),
    bookData: bookData,
  });
  if (bookData?.author?.toString() !== req.userId) {
    return next(
      createHttpError('403', 'User dont have permission to update the book.')
    );
  }

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log({
    files,
  });
  let coverImageUploadeResult: any = '';
  let bookUploadResult: any = '';
  if (files.coverImage) {
    // If we are updatiing file , then delete the prev file from cloudinary

    await deleteResourceFromCloudinary({
      url: bookData.coverImage,
      isWithExtension: false,
      next,
      resource_type: 'image',
    });

    coverImageUploadeResult = await uploadCoverImage(files, next);
    console.log({
      coverImageUploadeResult,
    });
  }

  if (files.file) {
    await deleteResourceFromCloudinary({
      url: bookData.file,
      isWithExtension: true,
      next,
      resource_type: 'raw',
    });
    bookUploadResult = await uploadBookPdf(files, next);
  }

  const updates: {
    title?: string;
    genre?: string;
    file?: string;
    coverImage?: string;
  } = { title, genre };

  if (bookUploadResult?.secure_url) {
    updates['file'] = bookUploadResult.secure_url;
  }
  if (coverImageUploadeResult?.secure_url) {
    updates['coverImage'] = coverImageUploadeResult.secure_url;
  }
  console.log({
    updates,
  });
  const updateBook = await bookModel.findByIdAndUpdate(
    bookId,
    {
      $set: updates,
    },
    { new: true }
  );

  res.json({
    updateBook,
  });

  // const updatedBook = await bookModel.findByIdAndUpdate(
  //   req.params.bookId,
  //   {
  //     $set: req.body,
  //   },
  //   {
  //     new: true,
  //   }
  // )

  // res.status(200).json(updatedBook)
};

const getBookList = async (req: Request, res: Response, next: NextFunction) => {
  const timer = await new Promise(res => setTimeout(res, 5000));
  try {
    // Todo : add pagination
    const bookList = await bookModel.find().populate('author', 'name email');
    // .populate({ path: 'author', select: 'name email' }) // Another version populate('author', 'name')

    res.json(bookList);
  } catch (error) {
    return next(createHttpError(500, 'Error while getting a book.'));
  }
};

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await bookModel
      .findById(req.params.bookId)
      .populate('author', 'name email');

    res.json(book);
  } catch (err) {
    return next(createHttpError(500, 'Error while getting book information'));
  }
};
const deleteSingleBook = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await bookModel.findOne({ _id: req.params.bookId });

    if (!book) {
      return next(createHttpError(404, 'Book not found'));
    }

    // Authorize user
    if (req.userId !== book.author.toString()) {
      return next(
        createHttpError(403, 'User do not have permission to delete this book')
      );
    }

    // delete claudinary resources

    await deleteResourceFromCloudinary({
      url: book.coverImage,
      isWithExtension: false,
      next,
      resource_type: 'image',
    });

    await deleteResourceFromCloudinary({
      url: book.file,
      isWithExtension: true,
      next,
      resource_type: 'raw',
    });

    await bookModel.findByIdAndDelete(req.params.bookId);

    res.status(204);
  } catch (err) {
    return next(createHttpError(500, 'Error while deleting book information'));
  }
};

export { createBook, updateBook, getBookList, getSingleBook, deleteSingleBook };
