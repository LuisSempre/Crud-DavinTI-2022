const express = require("express")
const { PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()
const allTodos = [{ nome: "aaaa", status: false}]
const todosRoutes = express.Router()

todosRoutes.post('/todos', async (request, response) => {
    const { name } = request.body
    const todo = await prisma.todo.create({
        data: {
            name,
        }
    })
    // allTodos.push({ name, status: false})
    return response.status(201).json(todo)
})

todosRoutes.get("/todos", (request, response) => {
    return response.status(200).json(allTodos)
})

module.exports = todosRoutes