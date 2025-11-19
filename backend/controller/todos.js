const {readTodos, writeTodos, generateId} = require('../db/fileStorage')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom_error')

const getAllTodos = asyncWrapper(async(req, res) => {
    const todos = await readTodos()
    res.status(200).json({todos})
})

const createTodo = asyncWrapper(async(req, res) => {
    const {name, dueDate, priority, isRepeating} = req.body
    
    if (!name) {
        return res.status(400).json({msg: 'must provide name'})
    }
    
    if (name.length > 20) {
        return res.status(400).json({msg: 'name cannot be more than 20 characters'})
    }
    
    if (priority && (priority < 1 || priority > 4)) {
        return res.status(400).json({msg: 'priority must be between 1 and 4'})
    }
    
    const today = new Date().toISOString().split('T')[0]
    
    const todos = await readTodos()
    const todo = {
        id: generateId(),
        name: name.trim(),
        completed: false,
        dueDate: dueDate || today,
        priority: priority || 4,
        isRepeating: isRepeating || false,
        createdAt: new Date().toISOString()
    }
    
    todos.push(todo)
    await writeTodos(todos)
    res.status(201).json({todo})
})

const getTodo = asyncWrapper(async(req, res, next) => {
    const {id} = req.params
    const todos = await readTodos()
    const todo = todos.find(t => t.id === id)
    
    if (!todo) {
        return next(createCustomError(`No todo with id : ${id}`, 404))
    }
    
    res.status(200).json({todo})
})

const updateTodo = asyncWrapper(async(req, res, next) => {
    const {id} = req.params
    const {name, completed, dueDate, priority, isRepeating} = req.body
    const todos = await readTodos()
    const todoIndex = todos.findIndex(t => t.id === id)
    
    if (todoIndex === -1) {
        return next(createCustomError(`No todo with id : ${id}`, 404))
    }
    
    if (name !== undefined) {
        if (!name) {
            return res.status(400).json({msg: 'must provide name'})
        }
        if (name.length > 20) {
            return res.status(400).json({msg: 'name cannot be more than 20 characters'})
        }
        todos[todoIndex].name = name.trim()
    }
    
    if (completed !== undefined) {
        todos[todoIndex].completed = completed
    }
    
    if (dueDate !== undefined) {
        todos[todoIndex].dueDate = dueDate
    }
    
    if (priority !== undefined) {
        if (priority < 1 || priority > 4) {
            return res.status(400).json({msg: 'priority must be between 1 and 4'})
        }
        todos[todoIndex].priority = priority
    }
    
    if (isRepeating !== undefined) {
        todos[todoIndex].isRepeating = isRepeating
    }
    
    await writeTodos(todos)
    res.status(200).json({todo: todos[todoIndex]})
})

const deleteTodo = asyncWrapper(async(req, res, next) => {
    const {id} = req.params
    const todos = await readTodos()
    const todoIndex = todos.findIndex(t => t.id === id)
    
    if (todoIndex === -1) {
        return next(createCustomError(`No todo with id : ${id}`, 404))
    }
    
    const deletedTodo = todos.splice(todoIndex, 1)[0]
    await writeTodos(todos)
    res.status(200).json({todo: deletedTodo})
})

module.exports = {
    getAllTodos,
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo
}