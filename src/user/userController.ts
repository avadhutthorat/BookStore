import express, { NextFunction, Request, Response } from 'express'

const createUser = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'User created successfully',
  })
}

export { createUser }
