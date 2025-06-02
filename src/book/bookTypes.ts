import { user } from '../user/userTypes'

export interface Book {
  _id: string
  title: string
  author: user
  genre: string
  coverImage: string
  file: string
  createdAt: Date
  updatedAt: Date
}
