const express = require("express")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const allTodos = [{ nome: "aaaa", status: false }]
const todosRoutes = express.Router()

todosRoutes.post('/todos', async (request, response) => {
    const { name } = request.body
    const todo = await prisma.todo.create({
        data: {
            name,
            status: false,
        }
    })
    return response.status(201).json(todo)
})

todosRoutes.get("/todos", async (request, response) => {
    const todos = await prisma.todo.findMany()
    return response.status(200).json(allTodos)
})

todosRoutes.put("/todos", async (request, response) => {
    const todo = await prisma.todo.update({
        where: {
            id,

        },
        data: {
            name,
            status
        }
    })
})

module.exports = todosRoutes