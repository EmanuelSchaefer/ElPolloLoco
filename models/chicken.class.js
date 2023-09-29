/**
 * Represents a chicken enemy that can move on the canvas.
 * @extends MovableObject
 */
class Chicken extends MovableObjects {
     /**
    * The height of the chicken.
    * @type {number}
    */
    height = 70;
     /**
    * The width of the chicken.
    * @type {number}
    */
    width = 75;
     /**
    * The y coordinate of the chicken position.
    * @type {number}
    */
    y = 360;
     /**
    * The x coordinate of the chicken position.
    * @type {number}
    */
    x = 500;
    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

     /**
    * A series of image paths representing the various images of the running chicken.
    * @type {string[]}
    */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
     /**
    * A series of image paths representing the chicken's various dying images.
    * @type {string[]}
    */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
    * Constructs a new Chicken object.
    */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = this.x + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.5;

        this.aniamate();
    }

    /**
    * Animate the chicken through movement and images.
    */
    aniamate() {
        setInterval(() => {
            if (this.chickenDead()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_DEAD);
            }
        });

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

}