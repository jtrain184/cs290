var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_jarrettp',
  password        : '3201',
  database        : 'cs290_jarrettp'
});

module.exports.pool = pool;
