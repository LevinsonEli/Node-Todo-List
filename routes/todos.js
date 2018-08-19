
var express = require("express");
var router = express.Router();
var db = require("../models");
var helpers = require("../helpers/todos");

//db.Todo.create({name: "Become a millioner.", completed: true});

router.route("/")
    .get(helpers.getTodos)
    .post(helpers.pcreateTodo);

router.route("/:todoId")
    .get(helpers.getTodo)
    .put(helpers.updateTOdo)
    .delete(helpers.deleteTodo);

module.exports = router;
