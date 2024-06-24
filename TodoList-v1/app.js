//jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

const new_items = [];

const work_list = [];

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){

    const day = date.getDate();

    res.render("list", {list_title: day, list_items: new_items});

});

app.post("/", function(req, res){

    if(req.body.list === "Work"){
        work_list.push(req.body.new_item);
        res.redirect("/work");

    } else {
        new_items.push(req.body.new_item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {list_title: "Work", list_items: work_list});
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(3000, function(){
    console.log("server is running on port 3000");
});