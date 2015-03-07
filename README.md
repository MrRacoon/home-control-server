Home-Control-Server
===================

Made by Erik Sutherland, this repository is a REST client for controlling
home devices on a local WIFI network.


lighting
--------

### Turn on all LIFX bulbs
`/lighting/on`

### Turn off all LIFX bulbs
`/lighting/off`

### Change the color of all lifx bulbs
`/lighting/change/{hue}/{saturation}/{luminecence}/{white}/{fade-time}`

* Hue
    * the color of the bulb
* Saturation
    * `0xffff` for color
    * `0x0000` for whites
* Luminecence
    * The brightness
* White
    * White balance for whites
* Fade-Time
    * How quickly to transition

### Change the color of all lifx bulbs
`/lighting/color/{colorValue}`

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
