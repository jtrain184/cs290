var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 10001);

app.post('/',function(req,res){
  var context = {};
  var receivedValues = [];
  
  for (var v in req.body) {
    receivedValues.push({'name':v, 'value' :req.body[v]});
  }
  context.sentData = receivedValues;
  res.render('post',context);
});

app.get('/',function(req,res){
  var context = {};
  var receivedValues = [];
  for (var v in req.query) {
    receivedValues.push({'name':v, 'value':req.query[v]});
  }

  context.sentData = receivedValues;
  res.render('get', context);
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
