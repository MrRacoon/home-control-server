var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({'Home-Conrol': 'https://github.com/MrRacoon/home-control-server.git'});
});

module.exports = router;
