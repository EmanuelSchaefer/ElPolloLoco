/**
 * Watch the RightBottle sauce on the screen.
 * @extends DrawableObject
 */
class BottleRight extends Bottle {
    /**
     * The y coordinates value of the bottleRight.
     */
    y = 365;
    /**
     * The x coordinates value of the bottleRight.
     */
    x = 160;
    /**
    * The height of the bottleRight.
    * @type {number}
    */
    height = 73;
    /**
     * The width of the bottle.
     * @type {number}
     */
    width = 73;

    /**
     * An array of image paths representing the different images of the bottleRight.
     * @type {string[]}
     */
    IMAGES_BOTTLEfly = [
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Constructor a new BottleRight object.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLEfly);
        this.x = 300 + Math.random() * 2000;
    }
}