# Zoom-Image
Handles Hovers over an image and creates a mini view for it

### Docs Languages
- [English](./README.md)
- [Español](./LEEME.md)

## _Usage_
Using Zoom-Image it's too simple
Just follow the next example

### Example

```
import Zoom_Image from "./zoom_controller.js";

//Image who will handle the hover
const Image = document.getElementById("Image");

//Parent Element
const Div = document.getElementById("Body");

//Zoom Buttons
const Increase = document.getElementById("ZoomIn");
const Decrease = document.getElementById("ZoomOut");

/**
 * 400 AND 500 are the dimensions of the canvas element (400 and 500 are recommended but you can use any other dimensions).
 * 20 Means 200%
 * Both 1600 is the size of the image  drawn in the canvas element.
 * "Avion" is a css className.
**/

const ZoomView = new Zoom_Image(Image, 20, Div, 300, 600, 1600, 1600, "Canvas", Increase, Decrease, ["Avion"]);


//Creates a zoom View for every hover on the image
ZoomView.Init();
```

*Important*: Remember to use a css position for the <canvas> element, it can be "position:fixed" or "position:relative" to avoid problems with the
 rendering of the <canvas> component.
 
__If you need a more detailed example__ [Click here](./Example) or visit by yourself __"./Examples"__ in this proyect

 
### Library File:
[zoom_controller.js](./zoom_controller.js)

## _Developed by_
- @Spenser-HN
