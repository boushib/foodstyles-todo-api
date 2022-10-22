import { Request, Response } from 'express'
import { TodoRepo } from '../repos'
import Joi from 'joi'
import { IRequest } from '../types'

export const getTodos = async (req: IRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })

    const todos = await TodoRepo.get(req.user.id)

    res.status(200).json({ todos })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const createTodo = async (req: IRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })

    // Validate request body
    const schema = Joi.object().keys({
      title: Joi.string().min(6).max(255),
    })

    const { error } = schema.validate(req.body)

    if (error) {
      const { message } = error.details[0]
      return res.status(400).json({ message })
    }

    const { title } = req.body
    const todo = await TodoRepo.create({ title, userId: req.user.id })
    res.status(201).json(todo)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const updateTodo = async (req: IRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    const id = Number(req.params.id)
    const { status } = req.body

    // Check if status is valid
    if (status !== 'IN_PROGRESS' && status !== 'COMPLETED') {
      return res.status(400).json({ message: 'Invalid status' })
    }

    // Check if todo exists & belongs to user
    const existingTodo = await TodoRepo.getById(id)

    if (!existingTodo) return res.status(404).json({ message: 'Todo not found' })

    if (existingTodo.user_id !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const todo = await TodoRepo.updateStatus({ id, status })
    res.status(201).json(todo)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const deleteTodo = async (req: IRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    const id = Number(req.params.id)

    // Check if todo exists & belongs to user
    const existingTodo = await TodoRepo.getById(id)

    if (!existingTodo) return res.status(404).json({ message: 'Todo not found' })

    if (existingTodo.user_id !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const todo = await TodoRepo.delete(id)
    res.status(201).json(todo)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}
