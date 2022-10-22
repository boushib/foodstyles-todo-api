import { Router } from 'express'
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controllers'
import { requireAuth } from '../middlewares'

export const todoRouter = Router()

todoRouter.route('/todos').get(requireAuth, getTodos).post(requireAuth, createTodo)
todoRouter.route('/todos/:id').patch(requireAuth, updateTodo).delete(requireAuth, deleteTodo)
