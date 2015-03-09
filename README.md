Home-Control-Server
===================

Made by Erik Sutherland, this repository is a REST client for controlling
home devices on a local WIFI network.


lighting
--------

### Turn on all LIFX bulbs
`GET` `/lighting/on`

### Turn off all LIFX bulbs
`GET` `/lighting/off`

### Change the color of all lifx bulbs
`POST` `/lighting/color`

* `hue`
    * the color of the bulb
* `sat`
    * `0xffff` for color
    * `0x0000` for whites
* `lum`
    * The brightness
* `whi`
    * White balance for whites
* `fad`
    * How quickly to transition

### Change the color of all lifx bulbs
`GET` `/lighting/color/{colorValue}`

color values include: 
* red
* orange
* yellow
* green
* cyan
* blue
* black
* purple
* pink
* darkPink
