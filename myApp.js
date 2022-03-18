var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();

// --> 7)  Mount the Logger middleware here
app.use((req, res, next) => {

 let string = `${req.method} ${req.path} - ${req.ip}`
 console.log(string) 
   
  next();

});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}))


//1 - meet the console
console.log("hello world")

//2 - serve an html file
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
})

//3 - serve static asset
app.use('/public', express.static(__dirname + "/public"))

//4 - serve json on a specific route
//  app.get('/json', function(req, res){
//      res.json({"message": "Hello json"})
//  })

//6 - use .env

app.get('/json', function(req, res){
    console.log(process.env.MESSAGE_STYLE,  "message style")
    if(process.env.MESSAGE_STYLE==="uppercase"){
        res.json(
            {"message": "HELLO JSON"})
        
    }else{
        res.json(
            {"message": "Hello json"}
        )
    }
});

/** 8) Chaining middleware. A Time server */
app.get('/now', function(req,res, next){
  
  next();
}, function(req, res){
 var time =  new Date()
  console.log('time'+time);
  res.json({'time': time});
}
       );
/** 9)  Get input from client - Route parameters */

app.get("/:word/echo", (req, res) => {
  let word = req.params.word
  
  let jsonObj = {echo: word,echo: word};
  res.send(jsonObj);
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get('/name', (req, res) => {
  let first = req.query.first;
  let last = req.query.last;
  
  let jsonObj = { name: `${first} ${last}` };
  res.send(jsonObj);
});

/** 12) Get data form POST  */
app.post('/name', (req, res) => {
  let name = req.body.first + ' ' + req.body.last;
  res.json({name: name});
});


 module.exports = app;

