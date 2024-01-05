import { Router } from 'express'

import { todo } from '../models/todo'

type RequestBody = { text: string }
type RequestParams = { todoId: string }

let todos: todo[] = []

const router = Router()

router.get('/', (req, res, next) => {
    res.status(200).json({todos: todos})
})

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody
    const newTodo: todo = {
        id: new Date().toISOString(),
        text: body.text
    }
    todos.push(newTodo)
    return res.status(200).json({message: 'added new todo!', todo: newTodo, todos: todos})
})

router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams
    const body = req.body as RequestBody
    const todoId = params.todoId
    const todoIndex = todos.findIndex(todo => todo.id === todoId)
    if(todoIndex >= 0){
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text}
        return res.status(200).json({message: 'updated todos!', todos: todos})
    }
    res.status(403).json({message: 'could not find todo for this id!'})
})

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams
    const todoId = params.todoId
    todos = todos.filter(todoItem => todoItem.id !== todoId)
    res.status(200).json({message: 'todo deleted!', todos: todos})
})

export default router 