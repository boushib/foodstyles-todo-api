import { Request } from 'express'

export interface IUser {
  id: number
  name: string
  email: string
  password: string
  created_at: string
  updated_at: string
}

export interface IRequest extends Request {
  user?: IUser
}
