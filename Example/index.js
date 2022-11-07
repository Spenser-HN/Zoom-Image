import Zoom_Image from "./scripts/zoom_controller.js";

//Image who will handle the hover
const Image = document.getElementById("Image");

//Parent Element
const Div = document.getElementById("Div");

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