/**
 * Represents a drawable object that can be drawn on the canvas.
 */
class DrawableObject {
    /**
     * The image object representing the drawable object.
     * @type {HTMLImageElement}
     */
    img;
    /**
     * Cache to store loaded image objects.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};
    /**
    * The index of the current image in the cache.
    * @type {number}
    */
    currentImage = 0;
    /**
   * The x coordinate of the drawable-object position.
   * @type {number}
   */
    x = 120;
    /**
   * The y coordinate of the drawable-object position.
   * @type {number}
   */
    y = 280;
    /**
   * The height coordinate of the drawable-object position.
   * @type {number}
   */
    height = 150;
    /**
   * The width coordinate of the drawable-object position.
   * @type {number}
   */
    width = 100;

    /**
   * Loads an image from the path and assigns it to the "img" property.
   * @param {string} path – The path of the image to load.
   */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            // errors
        }
    }

    /**
   * Draws a frame (rectangle) around the drawable object.
   * Used for all the objects specified.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottle || this instanceof Endboss) {
            ctx.beginPath();
            //   ctx.lineWidth = '2';
            //   ctx.strokeStyle = 'blue';
            //   ctx.rect(this.x + this.offset.x , this.y + this.offset.y,(this.x + this.width - this.offset.width) - (this.x + this.offset.x),(this.y + this.height - this.offset.height) - (this.y + this.offset.y));
            //   ctx.rect(this.x, this.y, this.width, this.height);
            //   this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom
            ctx.stroke();
        }
    }

     /**
    * Loads multiple images from an array of image paths and stores them in the image cache.
    * @param {string[]} arr
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}