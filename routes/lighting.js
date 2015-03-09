var _       = require('lodash')
var express = require('express');
var router  = express.Router();

// Map of various hues by name
var hueMap = {
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
    , salmon      : 0xf000
};

// Map of various saturations by name
var satMap = {
    white   : '0x0000'
    , color : '0xffff'
};

// Map of various luminesences by name
var lumMap = {
    on       : '0xffff'
    , off    : '0x0000'
    , low    : '0x4000'
    , med    : '0x8000'
    , medium : '0x8000'
    , hi     : '0xc000'
    , high   : '0xc000'
};

// Map of various whites by name
var whiMap = {
    none     : '0x0000'
    , low    : '0x4000'
    , med    : '0x8000'
    , medium : '0x8000'
    , hi     : '0xc000'
    , high   : '0xc000'
};

// Map of various fades by name
var fadMap = {
    instant : '0x0000'
    , now   : '0x0000'
    , quick : '0x0100'
    , walk  : '0x0800'
    , mosey : '0x1000'
    , slow  : '0x1000'
    , creep : '0x2000'
};

// Merge all the maps into a single lookup
var lookup = {
    hue   : hueMap
    , sat : satMap
    , lum : lumMap
    , whi : whiMap
    , fad : fadMap
}

defaults = {
    hue:   0x0000
    , sat: 0x0000
    , lum: 0x0000
    , whi: 0x0000
    , fad: 0x0000
}


function cleanBulbSettings(obj) {
    return _.chain(obj)
        .transform(function (ret, val, key) {
            // Match the value to hex if you can, and then cast it to a number
            var num = (val.match(/^(0x)[0-9A-Fa-f]*$/) || [''] )[0]
            if (num) {
                val = Number(num);
            }
            switch (typeof val) {
                case 'number':
                    console.log('got number: ' + val); 
                    // Make sure the number is not out of bounds
                    ret[key] = val & 0xffff;
                    break;
                case 'string':
                    console.log('got string: ' + val);
                    // Lookup the keyword in the lookup table, else default
                    ret[key] = lookup[key][val];
                    break;
                default:
                    console.log('got nuthin\': ' + val);
                    // anything else just gets left alone...for now
                    ret[key] = val;
                    break;
            }
        })
        .value()
}

/* GET home page. */
router.get('/', function(req, res) {
    res.json('lighting Control');
});

/** Turn on the lights
 *
 * Try:
 *  curl -i http://localhost:3000/lighting/on
 */
router.get('/on', function(req, res) {
    var l = req.lifx;
    l.lightsOn();
    res.json('lights on');
});

/** Turn on the lights
 *
 * Try:
 *  curl -i http://localhost:3000/lighting/off
 */
router.get('/off', function(req, res) {
    var l = req.lifx;
    l.lightsOff();
    res.json('lights off');
});

/** Get Bulb Information
 *
 * Try:
 *  curl -i http://localhost:3000/lighting/bulbs
 */
router.get('/bulbs', function(req, res) {
    var l  = req.lifx;
    var b = l.bulbs;
    res.json(b);
});

/** Get Bulb Gateway Information
 *
 * Try:
 *  curl -i http://localhost:3000/lighting/gateways
 */
router.get('/gateways', function(req, res) {
    var l = req.lifx;
    var b = l.gateways;
    res.json(b);
});

/** Change the color of the lights
 *
 * Post a JSON object containing color change information
 * The expectation is that the number are 16-bit number (i.e. 0xffff)
 *
 * JSON options include:
 *  hue - hue
 *  sat - saturation
 *  lum - lum
 *  whi - white balance (when white colors are chosen throut sat)
 *  fad - fade-time in miliseconds
 *
 * Try:
 *  curl -i http://localhost:3000/lighting/color --data 'hue=0xb000&sat=0x1000&lum=0x8000&whi=0xffff'
 */
router.post('/color', function(req, res) {
    var l = req.lifx;
    var d = cleanBulbSettings(req.body);
    console.log('');
    l.lightsColour(
        d.hue || defaults.hue,
        d.sat || defaults.sat,
        d.lum || defaults.lum,
        d.whi || defaults.whi,
        d.fad || defaults.fad
    );
    res.json(d);
});


module.exports = router;
