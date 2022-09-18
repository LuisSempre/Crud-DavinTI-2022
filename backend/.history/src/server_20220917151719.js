const express = require("express")

const app = express()

app.use(express.json())

app.get("/health", (req, res) => {
    return res.json("up")
})

app.listen(3333, () => console.log("server up in 3333"))