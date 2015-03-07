var express = require('express');
var router  = express.Router();

var colorMap = {
    red        : 0x0000
    , orange   : 0x2000
    , yellow   : 0x3000
    , green    : 0x5000
    , cyan     : 0x8000
    , blue     : 0x9000
    , black    : 0xa000
    , purple   : 0xc000
    , pink     : 0xd000
    , darkPink : 0xe000
};

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

router.get('/color/:col', function(req, res) {
    var l = req.lifx;
    l.lightsColour(colorMap[req.params.col],0xffff,0xffff,0x0dac,0x0513);
    res.json('Changing to color ' + req.params.col);
});
module.exports = router;
