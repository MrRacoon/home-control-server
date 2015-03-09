var express = require('express');
var router  = express.Router();

var colorMap = {
    red           : 0x0000
    , orange      : 0x1800
    , gold        : 0x2000
    , yellow      : 0x2400
    , yellowGreen : 0x3000
    , green       : 0x5000
    , cyan        : 0x8000
    , skyBlue     : 0x9000
    , blue        : 0x9400
    , lightBlack  : 0xa000
    , black       : 0xb000
    , purple      : 0xc000
    , pink        : 0xd000
    , darkPink    : 0xe000
    , hotPink     : 0xe000
    , slamon      : 0xf000
};

defaults = {
    hue: 0x0000,
    sat: 0xffff,
    lum: 0xffff,
    whi: 0x0000,
    fad: 0x0000
}

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

router.get('/bulbs', function(req, res) {
    var l  = req.lifx;
    var bs = l.bulbs;
    res.json(bs);
});

router.post('/color', function(req, res) {
    var l = req.lifx;
    var d = req.body;
    l.lightsColour(
        d.hue || defaults.hue,
        d.sat || defaults.sat,
        d.lum || defaults.lum,
        d.whi || defaults.whi,
        d.fad || defaults.fad
    );
    res.json(d);
});

router.get('/color/:col', function(req, res) {
    var l = req.lifx;
    var d = [
        colorMap[req.params.col] || defaults.hue,
        0xffff || defaults.sat,
        0xffff || defaults.lum,
        0x0dac || defaults.whi,
        0x0000 || defaults.fad
    ]
    l.lightsColour.apply(l, d)
    res.json(d);
});

router.get('/colorFade/:col', function(req, res) {
    var l = req.lifx;
    var d = [
        colorMap[req.params.col] || defaults.hue,
        0xffff || defaults.sat,
        0xffff || defaults.lum,
        0x0dac || defaults.whi,
        0x0513 || defaults.fad
    ];
    l.lightsColour.apply(l, d);
    res.json(d);
});

module.exports = router;
