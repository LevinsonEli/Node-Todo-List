
var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost:27017/todo-api", { useNewUrlParser: true });

mongoose.Promise = Promise; // Alowes to use promise (.then.catch)

module.exports.Todo = require("./todo");
