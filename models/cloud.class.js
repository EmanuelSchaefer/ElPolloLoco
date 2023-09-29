/**
 * Represents a cloud object that can move on the canvas.
 * @extends DrawableObject
 */
class Cloud extends MovableObjects {
     /**
    * The y coordinate of the cloud position.
    * @type {number}
    */
    y = 20;
     /**
    * The width of the cloud.
    * @type {number}
    */
    width = 1000;
     /**
    * The height of the cloud.
    * @type {number}
    */
    height = 300;


     /**
    * Constructs a new Cloud object.
    */
    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/full.png');

        this.x = Math.random() * 500;   
        this.animate(); 
    }
    
    
     /**
    * Moves the cloud to the left.
    */
    animate() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}