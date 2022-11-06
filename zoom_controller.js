/**
 * @class Zoom_Controller 
 * @description Handles Hovers over an image and creates a mini view for it
 * @example 
 * import Zoom_Controller from "./zoom_controller";

   //Image
   const Image = document.getElementById("Image");

   //Parent Element
   const Div = document.getElementById("Body");

   //Zoom Buttons
   const Increase = document.getElementById("ZoomIn");
   const Decrease = document.getElementById("ZoomOut");

   const ZoomView = new Zoom_Controller(Image, Div, 600, 1200, "Canva", Increase, Decrease);

   //Creates a zoom View for every hover on the image
   ZoomView.Init();
*/

class Zoom_Controller {

    /**
     * 
     * @param {HTMLElement | null} ImageElement 
     * @param {HTMLElement | null} CanvasParentElement 
     * @param {number} CanvasElementHeight
     * @param {number} CanvasElementWidth
     * @param {number} CanvasImageHeight
     * @param {number} CanvasImageWidth
     * @param {string} CanvasId 
     * @param {HTMLElement | null} IncreaseZoomButton 
     * @param {HTMLElement | null} DecreaseZoomButton 
     * @param {Array<string> | null } Styles Css class list
     */

    constructor(ImageElement, CanvasParentElement, CanvasElementHeight, CanvasElementWidth, CanvasImageHeight, CanvasImageWidth, CanvasId, IncreaseZoomButton, DecreaseZoomButton, ...Styles) {
        this.ImageElement = ImageElement;
        this.CanvasParentElement = CanvasParentElement;
        this.Canvasheight = CanvasImageHeight;
        this.Canvaswidth = CanvasImageWidth;
        this.CanvasElementWidth = CanvasElementWidth;
        this.CanvasElementHeight = CanvasElementHeight;
        this.CanvasId = CanvasId;
        this.IncreaseZoomButton = IncreaseZoomButton;
        this.DecreaseZoomButton = DecreaseZoomButton;
        this.CanvasIsActive = false;
        this.Zoom = 0;
        this.Styles = Styles;
    }


    ChangeImage() { }

    ChangeCanvasElementDimensions(width, height) {
        this.CanvasElementHeight = height;
        this.CanvasElementWidth = width;
        this.RenderComponentAgain();
        console.warn("Canvas Element dimentions has been changed, zoom may not be correct")
    }

    ChangeCanvasImageDimensions(width, height) {
        this.Canvasheight = height;
        this.Canvaswidth = width;
    }

    ZoomIn() {
        if (this.Zoom < 10) {
            this.Zoom = this.Zoom + 1;
            this.Canvasheight += (this.Canvasheight * (1 / 10))
            this.Canvaswidth += (this.Canvaswidth * (1 / 10))
        }
    }

    ZoomOut() {
        if (this.Zoom > 0) {
            this.Zoom = this.Zoom - 1;
            this.Canvasheight = (this.Canvasheight - (this.Canvasheight * (1 / 10)))
            this.Canvaswidth = (this.Canvaswidth - (this.Canvaswidth * (1 / 10)))
        }
    }

    Clear(CTX) {
        CTX.clearRect(0, 0, this.Canvaswidth, this.Canvasheight);
    }

    CreateCanvasElement() {
        let Canvas = document.createElement("canvas");
        Canvas.id = this.CanvasId;

        if (this.Styles.length > 0) {
            this.Styles.forEach((style) => {
                Canvas.classList.add(style);
            })

        }

        if (this.CanvasElementWidth !== null) { Canvas.width = this.CanvasElementWidth };
        if (this.CanvasElementHeight !== null) { Canvas.height = this.CanvasElementHeight };


        this.CanvasParentElement.appendChild(Canvas);

    }

    /**
     * 
     * @param {boolean} Definitive If the node will never be rendered again 
     */
    Remove(Definitive) {
        this.GetCanvasElement().remove();

        if (Definitive) {
            this.ImageElement.removeEventListener("mousemove", this.MouseMoveHandler);
        }

        this.ImageElement.removeEventListener("mouseout", this.MouseOutHandler);
    }

    /**
     * 
     * @returns {HTMLElement | null}
     */
    GetCanvasElement() {
        return document.getElementById(this.CanvasId)
    }

    RenderComponentAgain() {
        if (this.CanvasIsActive === true) {
            this.CreateCanvasElement();
        }
        this.CreateCanvasElement()
    }

    MouseMoveHandler(e) {

        console.log(this.Canvaswidth, this.Canvasheight, this.Zoom)
        if (this.CanvasIsActive === false) {
            this.CreateCanvasElement();
            this.CanvasIsActive = true;
            return
        }

        let Canvas = this.GetCanvasElement();
        let CTX = Canvas.getContext("2d");

        //This data is done by the porcent of the movement
        let Movement = {
            X: (e.layerX * 100) / 600,
            Y: (e.layerY * 100) / 300
        }

        let ActualPosition = {
            X: -(this.Canvaswidth * (Movement.X / 100)),
            Y: -(this.Canvasheight * (Movement.Y / 100)),
        }

        this.Clear(CTX)

        switch (this.Zoom) {
            case 3:
                CTX.drawImage(this.ImageElement, ActualPosition.X + (this.Canvaswidth / 5), ActualPosition.Y + (this.Canvasheight / 5), this.Canvaswidth, this.Canvasheight)
                break;

            case 4:
                CTX.drawImage(this.ImageElement, ActualPosition.X + (this.Canvaswidth / 6), ActualPosition.Y + (this.Canvasheight / 6), this.Canvaswidth, this.Canvasheight)
                break;

            case 5:
                CTX.drawImage(this.ImageElement, ActualPosition.X + (this.Canvaswidth / 8), ActualPosition.Y + (this.Canvasheight / 8), this.Canvaswidth, this.Canvasheight)
                break;

            case 6:
                CTX.drawImage(this.ImageElement, ActualPosition.X + (this.Canvaswidth / 12), ActualPosition.Y + (this.Canvasheight / 12), this.Canvaswidth, this.Canvasheight)
                break;

            case 7:
                CTX.drawImage(this.ImageElement, ActualPosition.X + (this.Canvaswidth / 16), ActualPosition.Y + (this.CanvasElementHeight / 16), this.Canvaswidth, this.Canvasheight)
                break;

            case 8:
                CTX.drawImage(this.ImageElement, ActualPosition.X + (this.Canvaswidth / 17), ActualPosition.Y + (this.Canvasheight / 17), this.Canvaswidth, this.Canvasheight)
                break;

            case 9:
                CTX.drawImage(this.ImageElement, ActualPosition.X + (this.Canvaswidth / 18), ActualPosition.Y + (this.Canvasheight / 18), this.Canvaswidth, this.Canvasheight)
                break;

            case 10:
                CTX.drawImage(this.ImageElement, ActualPosition.X + (this.Canvaswidth / 20), ActualPosition.Y + (this.Canvasheight / 20), this.Canvaswidth, this.Canvasheight)
                break;

            default:
                CTX.drawImage(this.ImageElement, ActualPosition.X + (this.Canvaswidth / 4), ActualPosition.Y + (this.Canvasheight / 4), this.Canvaswidth, this.Canvasheight)
                break;
        }

        return

    }


    MouseOutHandler() {
        this.Remove(false);
        this.CanvasIsActive = false;
    }

    Init() {


        //Controlling Hovers
        this.ImageElement.addEventListener("mousemove", (e) => this.MouseMoveHandler(e));

        //Controllig MouseLeave
        this.ImageElement.addEventListener("mouseout", () => this.MouseOutHandler());


        //Mouse move will be handled latter
        /** 
    
        this.ImageElement.addEventListener("touchmove", (e) => {
            e.preventDefault();
        });
    
        **/

        //Zoom In
        this.IncreaseZoomButton.addEventListener("click", () => this.ZoomIn());

        //ZoomOut
        this.DecreaseZoomButton.addEventListener("click", () => this.ZoomOut());

    }

}

export default Zoom_Controller;