"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    return res.status(200).json({ message: 'added new todo!', todo: newTodo, todos: todos });
});
router.put('/todo/:todoId', (req, res, next) => {
    const todoId = req.params.todoId;
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: 'updated todos!', todos: todos });
    }
    res.status(403).json({ message: 'could not find todo for this id!' });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const todoId = req.params.todoId;
    todos = todos.filter(todoItem => todoItem.id !== todoId);
    res.status(200).json({ message: 'todo deleted!', todos: todos });
});
exports.default = router;
