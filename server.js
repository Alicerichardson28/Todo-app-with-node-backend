const express = require('express');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(cors());

// Middleware for data on post request
app.use(express.json({ extended: false }))


const todos = [
    {
        message: "Wash Car...",
        id:1
    },
    {
        message: "Pay phone bill...",
        id:2
    },
    {
        message: "Prep food...",
        id:3
    }
]

app.get("/", (req,res) => {
    res.status(200).json(todos);
});

app.post("/", (req,res) => {
    const newTodo = {
        message: req.body.message,
        id: uuidv4()
    }
    todos.push(newTodo)
    res.status(201).json(todos);
})

app.delete("/", (req,res) => {
    const id = req.body._id;

    todos.findById(id).remove ((err, result) => {
        if(err) res.send({ success: false, msg: err});

        res.send({ success: true, result: result});
    })
})

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
});