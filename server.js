// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var sassMiddleware = require("node-sass-middleware");
app.set('view engine', 'ejs');

app.use(sassMiddleware({
  src: __dirname + '/source',
  dest: __dirname + '/public',
}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));







// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.render(__dirname + '/views/index');
});


app.get('/list/:id', function(req,res){   
  let id = req.params.id;  
  let list = parseInt(id, 10) - 1
  
  const fs = require('fs');
  let rawdata = fs.readFileSync('data.json');  
  let listData = JSON.parse(rawdata);  
  
  
  let selectedListData = listData.lists[list].prompts
  
  console.log(selectedListData)
  res.render(__dirname + '/views/list', {list: id, data:selectedListData}); 
});

app.get("*", function (req, res) {
  res.render(__dirname + '/views/index');
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});