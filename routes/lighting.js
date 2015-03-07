var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.json('lighting Control');
});

router.get('/on', function(req, res) {
    var l = req.lifx;
    l.lightsOn();
    res.json('lights on');
});

router.get('/off', function(req, res) {
    var l = req.lifx;
    l.lightsOff();
    res.json('lights off');
});

router.get('/change/:hue/:sat/:lum/:whi/:fad', function(req, res) {
    var l = req.lifx;
    l.lightsColour(
        req.params.hue,
        req.params.sat,
        req.params.lum,
        req.params.whi,
        req.params.fad
    );
    res.json('Changing Lights');
});

module.exports = router;
