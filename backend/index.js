const express = require("express");//
const { todo } = require("./db");
const { createTodo, updateTodo } = require("./types"); 
const cors = require("cors");
const app = express();//

app.use(express.json());//
app.use(cors());

app.post("/todo", async function (req, res) {  //
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong input"
        });
        return;
    }

    // Put in MongoDB
    try {
        await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        });
        res.json({
            msg: "Todo Created"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error creating todo",
            error: error.message
        });
    }
});

app.get("/todos", async function (req, res) { // Added '/' to the route path
    try {
        const todos = await todo.find({});
        console.log(todos);
        res.json({
            todos
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error fetching todos",
            error: error.message
        });
    }
});

app.put("/completed", async function (req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong input"
        });
        return;
    }

    // Update in MongoDB
    try {
        await todo.findByIdAndUpdate(req.body.id, {
            completed: true
        });
        res.json({
            msg: "Todo Marked as completed"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error updating todo",
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
