var express = require('express');
var router = express.Router();

var paises = {
"paises":[
    {"nombre":"Argentina", "codigo":"AR"},
    {"nombre":"Bolivia", "codigo":"BO"}, 
    {"nombre":"Brasil", "codigo":"BR"},
    {"nombre":"Chile", "codigo":"CL"},
    {"nombre":"Paraguay", "codigo":"PY"},
    {"nombre":"Uruguay", "codigo":"UY"},
]
}

var paisesJSON = JSON.stringify(paises);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(paisesJSON);
  console.log(paisesJSON);
});

module.exports = router;
