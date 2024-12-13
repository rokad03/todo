const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:Bhargav%40123@cluster0.wfc1j.mongodb.net/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model('Todo', todoSchema);

module.exports = {
    todo
};
