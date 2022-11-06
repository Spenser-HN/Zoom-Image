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
     * @param {HTMLImageElement | null} ImageElement 
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
        this.Zoom = 1;
        this.Styles = Styles;
    }


    /**
     *@param {HTMLImageElement | null} Image
     *@returns {void} 
     */

    ChangeImage(Image) {
        this.Remove(false);
        this.ImageElement = Image;
        this.Zoom = 0;
        this.CreateCanvasElement()
    }

    /**
     *@returns {void} 
     */

    ChangeCanvasElementDimensions(width, height) {
        this.CanvasElementHeight = height;
        this.CanvasElementWidth = width;
        this.RenderComponentAgain();
        console.warn("Canvas Element dimentions has been changed, zoom may not be correct")
    }

    /**
     *@returns {void} 
     */

    ChangeCanvasImageDimensions(width, height) {
        this.Canvasheight = height;
        this.Canvaswidth = width;
    }

    /**
     *@returns {void} 
     */

    ZoomIn() {
        if (this.Zoom < 10) {
            this.Zoom = this.Zoom + 1;
            this.Canvasheight += 200;
            this.Canvaswidth += 100;
        }
    }

    /**
     *@returns {void} 
     */

    ZoomOut() {
        if (this.Zoom > 1) {
            this.Zoom = this.Zoom - 1;
            this.Canvasheight -= 200;
            this.Canvaswidth -= 100;
        }
    }

    /**
     *@returns {void} 
     */

    Clear(CTX) {
        CTX.clearRect(0, 0, this.Canvaswidth, this.Canvasheight);
    }

    /**
     *@returns {void} 
     */

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
     * @returns {void}
     */

    Remove(Definitive) {

        if (this.CanvasIsActive === true) {
            this.GetCanvasElement().remove();

            if (Definitive) {
                this.ImageElement.removeEventListener("mousemove", this.MouseMoveHandler);
            }

            this.ImageElement.removeEventListener("mouseout", this.MouseOutHandler);
        }

    }

    /**
     * 
     * @returns {HTMLElement | null}
     */

    GetCanvasElement() {
        return document.getElementById(this.CanvasId)
    }

    /**
     * @returns {void}
     */

    RenderComponentAgain() {
        this.Remove(false);
        this.CreateCanvasElement()
    }

    /**
     * 
     * @param {MouseEvent} e 
     * @returns {void}
     */

    MouseMoveHandler(e) {

        if (this.CanvasIsActive === false) {
            this.CreateCanvasElement();
            this.CanvasIsActive = true;
            return
        }

        let Canvas = this.GetCanvasElement();
        let CTX = Canvas.getContext("2d");

        this.Clear(CTX);

        //This data is done by the porcent of the movement

        let Movement = {
            X: (e.layerX * 100) / e.target.width,
            Y: (e.layerY * 100) / e.target.height
        }

        let X_DIVISOR = (this.Canvaswidth - this.CanvasElementWidth);
        let Y_DIVISOR = (this.Canvasheight - this.CanvasElementHeight)

        let Coordinates = {
            X: -(Movement.X * (X_DIVISOR / 100)),
            Y: -(Movement.Y * (Y_DIVISOR / 100))
        }

        CTX.drawImage(this.ImageElement, Coordinates.X, Coordinates.Y, this.Canvaswidth, this.Canvasheight)

        return

    }

    /**
    * 
    * @param {MouseEvent} e 
    * @returns {void}
    */

    MouseOutHandler() {
        this.Remove(false);
        this.CanvasIsActive = false;
    }

    /**
     * @returns {boolean}
     */

    IsTouchScreen() {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    }

    /**
     * @returns {void}
     * 
     */

    Init() {


        /* ? ------- Touch Screens -------- */
        if (this.IsTouchScreen() === true) {


            //Mouse move will be handled latter
            /** 
        
            this.ImageElement.addEventListener("touchmove", (e) => {
                e.preventDefault();
            });
        
            **/
            return

        }

        /* ?-------- Not toucheable screens ------- */
        //Controlling Hovers
        this.ImageElement.addEventListener("mousemove", (e) => this.MouseMoveHandler(e));

        //Controllig MouseLeave
        this.ImageElement.addEventListener("mouseout", () => this.MouseOutHandler());

        //Zoom In
        this.IncreaseZoomButton.addEventListener("click", () => this.ZoomIn());

        //ZoomOut
        this.DecreaseZoomButton.addEventListener("click", () => this.ZoomOut());

    }

}

export default Zoom_Controller;