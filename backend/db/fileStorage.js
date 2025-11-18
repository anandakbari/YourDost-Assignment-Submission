const fs = require('fs').promises
const path = require('path')

const dataPath = path.join(__dirname, '../data/todos.json')

const readTodos = async () => {
    try {
        const data = await fs.readFile(dataPath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

const writeTodos = async (todos) => {
    await fs.writeFile(dataPath, JSON.stringify(todos, null, 2))
}

const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

module.exports = { readTodos, writeTodos, generateId }