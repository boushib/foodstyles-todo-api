import { Request, Response } from 'express'
import { UserRepo } from '../repos'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await UserRepo.findWithEmailAndPassword({ email, password })

  if (!user) {
    return res.status(401).json({ message: 'Email and password do not match!' })
  }

  res.status(200).json({ ...user, password: undefined })
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  try {
    const user = await UserRepo.create({ name, email, password })
    res.status(201).json({ ...user, password: undefined })
  } catch (err) {
    console.log(err)
  }
}
