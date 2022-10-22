import { Request, Response } from 'express'
import { UserRepo } from '../repos'
import { genSalt, hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import Joi from 'joi'

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await UserRepo.findByEmail(email)

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isValidPassword = await compare(password, user.password)

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate JWT
    const { id, name, created_at, updated_at } = user
    const token = sign({ id, email }, process.env.JWT_SECRET!)

    res.status(200).json({
      user: {
        id,
        name,
        email,
        created_at,
        updated_at,
      },
      token,
    })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const signup = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const schema = Joi.object().keys({
      name: Joi.string()
        .pattern(new RegExp(/^[a-z\s]+$/i))
        .min(3)
        .max(100),
      email: Joi.string().email().max(255),
      password: Joi.string().min(6).max(255),
    })

    const { error } = schema.validate(req.body)

    if (error) {
      const { message } = error.details[0]
      return res.status(400).json({ message })
    }

    const { name, email, password } = req.body

    // Check if email is already taken
    const existingUser = await UserRepo.findByEmail(email)

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already taken' })
    }

    // Hash password
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)
    const user = await UserRepo.create({ name, email, password: hashedPassword })
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}
