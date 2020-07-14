
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static(__dirname + "/views/public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){
  url = "https://newsapi.org/v2/top-headlines?country=in&apiKey="+ process.env.API_KEY +"";

  https.get(url, function(response){
    let body = [];

    response.on("data", function(data){
      body.push(data);
    }).on("end", function(){
      body = Buffer.concat(body).toString();

      const news = JSON.parse(body);

      res.render("newsHome", {news:news});
    });
  });
});

app.listen(3000, function(){
    console.log("Server is started on 3000");
});
