
var express = require("express");
var app = express();
var port = process.env.PORT || 7788;
var bodyParser = require ("body-parser");

var todoRoutes = require("./routes/todos")

//To parse a body (req.body)
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded( {extended: true} ));
//Including views directory
app.use(express.static("public"));
app.use(express.static(__dirname + '/views'));

app.get("/", function(req, res){
    res.sendFile("index.html");
});

app.use('/api/todos', todoRoutes);

app.listen(port, function(){
    console.log("Server started.");
});
