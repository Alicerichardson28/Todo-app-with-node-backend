const express = require('express');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(cors());

// Middleware for data on post request
app.use(express.json({ extended: false }))


const todos = [
    {
        id:1,
        message: "Wash Car..."
    },
    {
        id:2,
        message: "Pay phone bill..."
    },
    {
        id:3,
        message: "Prep food..."
    }
]

app.get("/todos", (req,res) => {
    res.status(200).json(todos);
});

app.post("/todos", (req,res) => {
    const newTodo = {
        message: req.body.message,
        id: uuidv4()
    }
    todos.push(newTodo)
    res.status(201).json(todos);
})

app.put("/todos/:id", (req,res) => {
    let found = todos.some(todo => todo.id === parseInt(req.params.id))

    if(found){
        const updateTodo = req.body
        todos.forEach(todo => {
            if (todo.id === parseInt(req.params.id)) {
                todo.message = updateTodo.message ? updateTodo.message : todo.message
                res.json({ msg: 'Todo got update', todo })
            }
        })
    } else {
        res.status(400).json({ msg: `No todo with the id of ${req.params.id}`})
    }
})

app.delete("/todos/:id", (req,res) => {

})


const PORT = 5001;
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
});