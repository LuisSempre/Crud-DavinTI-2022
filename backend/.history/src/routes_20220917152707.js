const express = require("express")

const allTodos = []
const todosRoutes = express.Router()

todosRoutes.post('/todos', (request, response) => {
    const { name } = response.body
    allTodos.push({ name, status: false})
    return response.status(201).json(allTodos)
})