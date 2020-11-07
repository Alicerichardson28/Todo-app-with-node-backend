const express = require('express');
const app = express();

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

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
});