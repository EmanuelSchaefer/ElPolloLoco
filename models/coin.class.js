/**
 * Represents a coin object that can be collected by the character.
 * @extends DrawableObject
 */
class Coin extends MovableObjects {
     /**
    * The y coordinate of the coin position.
    * @type {number}
    */
    y = 500;
    x;
     /**
    * The height of the coin.
    * @type {number}
    */
    height = 113;
     /**
    * The width of the coin.
    * @type {number}
    */
    width = 113;
    offset = {
        x: 50,
        y: 50,
        width: 50,
        height: 50
    };

    /**
     * Images of the coin.
     */
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
    * Constructs a new Coin object.
    */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 300 + Math.random() * 1900;
        this.y = 300 - Math.random() * 250;
        this.animate();
    }

    /**
    * Animate the coin through movement and images.
    */
    animate() {
      setInterval(() => {
        if (this.playAnimation(this.IMAGES_COIN)) {
        } 
    }, 200);
  }
}