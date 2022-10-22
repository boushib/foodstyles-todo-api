import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { IRequest, IUser } from '../types'

export const requireAuth = (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' })
  }

  try {
    const user = verify(token, process.env.JWT_SECRET!) as IUser
    req.user = user
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized' })
  }

  next()
}
