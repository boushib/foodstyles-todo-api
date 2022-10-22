import { Router } from 'express'
import { login, signup } from '../controllers'

export const userRouter = Router()

userRouter.route('/login').post(login)
userRouter.route('/signup').post(signup)
