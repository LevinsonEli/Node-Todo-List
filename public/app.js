
var todoList = $(".list");

$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)

    $(".todoInput").keypress(function(event){
        if (event.which == 13) {
            createTodo();
        }
    })

    $(".list").on("click", "span", function(event){
        event.stopPropagation();
        removeTodo($(this).parent());
    });
    
    $(".list").on("click", "li", function(){
        updateTodo($(this));
    });

});

function addTodo(todo){
    var newTodo = $("<li class=\"task\">" + todo.name + "<span>X</span></li>");
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    if (todo.completed){
        newTodo.addClass("done");
    }
    todoList.append(newTodo);
}
function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function createTodo(){
    //send request to create new todo
    var userInput = $(".todoInput").val();
    $.post("/api/todos", {name: userInput})
    .then(function(newTodo){
        addTodo(newTodo);
        $(".todoInput").val("");
    })
    .catch(function(err){
        console.log(err);
    });
}

function removeTodo(todo) {
    var deleteUrl = "/api/todos/" + todo.data("id");
    $.ajax({
        method: "DELETE",
        url: deleteUrl
    })
    .then(function(data){
        todo.remove();
    })
    .catch(function(err){
        console.log(err);
    });
}

function updateTodo(todo) {
    var updateUrl = "/api/todos/" + todo.data("id");
    var isDone = !todo.data("completed");
    var updateData = {completed: isDone}
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        // console.log(todo.data("completed"));
        todo.data("completed", isDone);
    });
}
