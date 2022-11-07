# Zoom-Image
Maneja los hover sobre una imagen y crea un mini componente de zoom para ella.

### Lenguajes disponibles para esta documentación 
- [English](./README.md)
- [Español](./LEEME.md)

## _Uso_
User Zoom-Image es muy fácil.
Solo sigue los pasos del siguiente ejemplo

### Ejemplo

```
import Zoom_Image from "./zoom_controller.js";

//Imagen que va a manejar zooms y hovers
const Image = document.getElementById("Image");

//Elemento de HTML que sera el padre del elemento <canvas>
const Div = document.getElementById("Body");

//Bottones para hacer zoom
const Increase = document.getElementById("ZoomIn");
const Decrease = document.getElementById("ZoomOut");


/**
 * 400 x 500 son las dimensiones del elemento <canvas> respoectivamente (400 x 500 son lo recomendado pero puedes usar otras dimensiones).
 * 1600 x 1600 son las dimensiones de la imagen dibujada en el <canvas> Both 1600 (Puedes cambiar estas dimensiones si quieres).
 * "Avion" es una clase de css (recuerda mandar todas las clasess en un Array de strings)
**/

const ZoomView = new Zoom_Image(Image, Div, 400, 500, 1600, 1600, "Canvas", Increase, Decrease, ["Avion"]);

//Crea el controlador de Zoom para la imagen
ZoomView.Init();
```

## _Desadorrado por_
- @Spenser-HN
