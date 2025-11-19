const express=require('express')
const router=express.Router()
const {getAllTodos, createTodo, getTodo, updateTodo, deleteTodo}=require('../controller/todos')
router.route('/').get(getAllTodos).post(createTodo)
router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo)

module.exports=router