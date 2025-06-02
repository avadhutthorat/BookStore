import path from 'node:path'
import cloudinary from '../config/claudinary'
import createHttpError from 'http-errors'
import { NextFunction } from 'express'
import fs from 'node:fs'

export const uploadCoverImage = async (
  files: {
    [fieldname: string]: Express.Multer.File[]
  },
  next: NextFunction
) => {
  const coverImageMimeType = files.coverImage[0]?.mimetype.split('/').at(-1)
  const coverImageFileName = files.coverImage[0]?.filename
  const coverImagefilepath = path.resolve(
    __dirname,
    '../../public/data/uploads',
    coverImageFileName
  )
  try {
    const coverImageUploader = await cloudinary.uploader.upload(
      coverImagefilepath,
      {
        filename_override: coverImageFileName,
        folder: 'cover-folder',
        format: coverImageMimeType,
      }
    )

    return coverImageUploader
  } catch (error) {
    next(createHttpError(400, 'Error while uploading cover image.'))
  } finally {
    // Remove temp file
    fs.promises.unlink(coverImagefilepath)
  }
}
export const uploadBookPdf = async (
  files: {
    [fieldname: string]: Express.Multer.File[]
  },
  next: NextFunction
) => {
  const pdfFileName = files.file[0]?.filename
  const pdfpath = path.resolve(
    __dirname,
    '../../public/data/uploads',
    pdfFileName
  )
  try {
    const bookUploader = await cloudinary.uploader.upload(pdfpath, {
      filename_override: pdfFileName,
      resource_type: 'raw',
      folder: 'book-pdfs',
      format: 'pdf',
    })

    return bookUploader
  } catch (error) {
    return next(createHttpError(400, 'Error while uploading pdf'))
  } finally {
    // Remove temp file
    fs.promises.unlink(pdfpath)
  }
}

export const getPathName = (url: string, isWithExtension?: boolean) => {
  const splittedText = url.split('/')
  const fileNameWithoutExtension = isWithExtension
    ? splittedText.at(-1)
    : splittedText.at(-1)?.split('.').at(-2)
  const pathName = `${splittedText.at(-2)}/${fileNameWithoutExtension}`
  return pathName
}

export const deleteResourceFromCloudinary = async ({
  url,
  next,
  resource_type = 'image',
  isWithExtension,
}: {
  url: string
  next: NextFunction
  resource_type: string
  isWithExtension?: boolean
}) => {
  try {
    return await cloudinary.uploader.destroy(
      getPathName(url, isWithExtension),
      {
        resource_type,
      }
    )
  } catch (error) {
    return next(
      createHttpError(500, 'Error while deleting cloudinary resource')
    )
  }
}
