
/*****    Setup    *****/
var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public')); 

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 12037);

app.get('/',function(req,res){
  var context = {};
  mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    res.send(JSON.stringify(rows));
});


/*****    Initialize new table    *****/
app.get('/reset-table',function(req,res,next){
  var context = {};
  dbcon.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    dbcon.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
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
