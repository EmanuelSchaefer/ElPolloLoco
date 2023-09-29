/**
 * Watch the bottle sauce on the screen.
 * @extends DrawableObject
 */
class Bottle extends MovableObjects {
    /**
     * The y coordinates value of the bottle.
     * @type {number}
     */
    y = 365;
    /**
     * The x coordinates value of the bottle.
     * @type {number}
     */
    x = 160;
    /**
    * The height of the bottle.
    * @type {number}
    */
    height = 73;
    /**
     * The width of the bottle.
     * @type {number}
     */
    width = 73;
    offset = {
        x: 30,
        y: 25,
        width: 34,
        height: 10
    };

    /**
     * An array of image paths representing the different images of the bottle.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    /**
     * Constructor a new Bottle object.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 300 + Math.random() * 1900;
    }
}